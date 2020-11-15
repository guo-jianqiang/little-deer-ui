import React, {FC, useEffect, useRef, useState} from "react";
import Iconfont from '../Iconfont'
import './style.less'

interface ListViewProps {
    /**
     * 传入的Promise，一般为获取接口列表函数，promise返回list
     */
    API: Function;
    /**
     * 获取列表数据
     */
    getList: Function;
    /**
     * API函数附加参数
     */
    extraParams?: Object;
    /**
     * 刷新事件，返回第一页列表数据
     */
    refreshList?: Function;
    /**
     * 滚动加载阀值
     */
    onEndReachedThreshold?: number;
    /**
     * 下拉刷新阀值
     */
    threshold: number;
    /**
     * 最大下拉值
     */
    refreshNum?: number;
    /**
     * 展示下拉加载文本阀值
     */
    showRefreshTextThreshold?: number;
    /**
     * 是否需要刷新
     */
    isRefresh?: boolean;
    /**
     * 分页字段
     */
    limitKey: string;
    /**
     * 页码字段
     */
    currentKey: string;
}

const ListView:FC<ListViewProps> = (
    {
        API = () => new Promise(resolve => resolve()),
        extraParams = {},
        getList = () => {},
        refreshList = () => {},
        onEndReachedThreshold = 20,
        threshold = 50,
        refreshNum = 200,
        showRefreshTextThreshold = 24,
        isRefresh = true,
        currentKey = 'current',
        limitKey = 'limit',
        children
    }) => {
    const listRef = useRef(null)
    const touchStartPageY = useRef(0)
    const filter = useRef({
        [currentKey]: 1,
        [limitKey]: 20
    })
    const [state, setState] = useState({
        isEnd: false,
        loading: false,
        finish: true,
        distance: 0
    })

    useEffect(() =>  {
        refresh()
    }, [])

    const onTouchStart = e => {
        document.body.style.overflow = 'hidden'
        touchStartPageY.current = e.touches[0].pageY
        listRef.current.addEventListener('touchmove', onTouchMove, false)
    }

    const onTouchMove = e => {
        if (listRef.current.scrollTop === 0) {
            const diffDistance = e.touches[0].pageY - touchStartPageY.current
            if (diffDistance <= 0 || !isRefresh) return
            const distance = diffDistance > refreshNum ? refreshNum : diffDistance
            setState(prevState => ({...prevState, distance}))
            listRef.current.style.transform = `translateY(${distance}px)`
        }
    }

    const onTouchEnd = e => {
        const pageY = e.changedTouches[0].pageY
        if (pageY - touchStartPageY.current === 0) return
        document.body.style.overflow = ''
        let distance = state.distance
        let complete = distance < threshold
        const scrollToTop = async () => {
            distance = distance - 10
            listRef.current.style.transform = `translateY(${distance}px)`
            if (distance > 0) {
                if (distance < threshold && !complete) {
                    setState(prevState => ({...prevState, distance, loading: true, isEnd: false}))
                    await refresh()
                    setState(prevState => ({...prevState, loading: false}))
                    complete = true
                }
                window.requestAnimationFrame(scrollToTop)
            } else {
                listRef.current.style.transform = 'translateY(0px)'
                setState({...state, distance: 0})
            }
        }
        window.requestAnimationFrame(scrollToTop)
    }


    const refresh = () => {
        filter.current[currentKey] = 1
        return new Promise(async (resolve, reject) => {
            try {
                const list = await API({...filter.current, ...extraParams})
                refreshList(list)
                resolve({...state, loading: false})
            } catch (e) {
                reject(e)
            }
        })
    }
    const onLoad = async e => {
        const distance = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop
        if (distance < onEndReachedThreshold && state.finish && !state.isEnd) {
            filter.current[currentKey]++
            setState({...state,finish: false})
            const list = (await API({...filter.current, ...extraParams}))
            getList(list)
            setState({...state,finish: true, isEnd: list && list.length === 0})
        }
    }
    const {distance, finish, isEnd, loading} = state
    return (<React.Fragment>
        <div
            className='scroll-loading'
        >
            {
                distance > showRefreshTextThreshold ? <div
                    className={'scroll-loading-refresh'}
                >
                    {
                        loading ? <Iconfont type='iconloading1' className='program-refresh-loading' /> : <Iconfont
                            type='iconxiala'
                            style={
                                {
                                    transform: distance < threshold ? '' : 'rotate(-180deg)',
                                    transition: 'all .2s',
                                    marginRight: 4
                                }
                            }
                        />
                    }
                    {distance <= threshold ? loading ? '正在刷新' : '下拉刷新' : '释放刷新'}
                </div> : ''
            }
            <div
                className='scroll-loading-list'
                onScroll={onLoad}
                ref={listRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {
                    React.Children.only(children) ? children : null
                }
                <div className={'scroll-loading-list-loading'}>
                    {
                        !finish ? '加载中...' : !isEnd ? '' : '没有更多了'
                    }
                </div>
            </div>
        </div>
    </React.Fragment>)
}

export default ListView