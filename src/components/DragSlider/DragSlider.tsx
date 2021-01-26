import React from 'react'
import Iconfont from '../Iconfont'
import './style.less'

let onEndThreshold: number = 100 // 滑动阀值 超过该值触发滑动

interface DragSliderProps {
    /**
     * 标题
     */
    title: string | Function;
}

const DragSlider: React.SFC<DragSliderProps> = ({title, children}) => {
    const minTop: number = 100
    const initTop = React.useRef(0)
    const topRef = React.useRef(0)
    const [top, setStateTop] = React.useState(0)
    const startY = React.useRef(0)
    const dragSliderRef = React.useRef<HTMLDivElement>(null!)
    const dragBtnRef = React.useRef<HTMLDivElement>(null!)

    const onTouchStart = (e: TouchEvent) => {
        e.preventDefault()
        dragSliderRef.current.style.transition = 'none'
        document.body.style.overflow = 'hidden'
        if (e instanceof TouchEvent) {
            const touch = e.touches[0]
            startY.current = touch.clientY
            dragSliderRef.current.addEventListener('touchmove', onTouchMove)
        }
    }

    const onTouchMove = (e: TouchEvent) => {
        // e.stopPropagation()
        e.preventDefault()
        if (e instanceof TouchEvent) {
            const touch = e.touches[0]
            const displacement = touch.clientY - startY.current
            const newTop = topRef.current + displacement
            if (newTop < initTop.current && newTop > minTop) {
                dragSliderRef.current.style.setProperty('--top', newTop + 'px')
            }
        }

    }

    const getTop = () => {
        const top = getComputedStyle(dragSliderRef.current).getPropertyValue('--top').split('px')[0]
        return parseFloat(top)
    }

    const setTop = (top: number) => {
        dragSliderRef.current.style.setProperty('--top', top + 'px')
    }

    const onTouchEnd = (e: TouchEvent) => {
        e.preventDefault()
        document.body.style.overflow = 'auto'
        dragSliderRef.current.style.transition = 'top 300ms cubic-bezier(0.25, 1, 0.5, 1)'
        const prevTop = getTop()
        const touch = e.changedTouches[0]
        const displacement = touch.clientY - startY.current
        if (displacement < 0) {
            if (Math.abs(displacement) > onEndThreshold) {
                setTop(minTop)
            } else {
                setTop(initTop.current)
            }
        } else {
            if (Math.abs(displacement) > onEndThreshold) {
                setTop(initTop.current)
            } else if (displacement === 0) {
                if (prevTop === minTop) {
                    setTop(initTop.current)
                } else {
                    setTop(minTop)
                }
            } else {
                setTop(minTop)
            }
        }
        let currentTop = getTop()
        setStateTop(currentTop)
        topRef.current = currentTop
        dragSliderRef.current.removeEventListener('touchmove', onTouchMove)
    }
    const onScroll = () => {
        // e.stopPropagation()
        console.log(12)
    }
    React.useEffect(() => {
        console.log(dragSliderRef.current.clientHeight)
        const top = window.innerHeight - 64
        setStateTop(top)
        initTop.current = top
        topRef.current = top
        dragBtnRef.current.addEventListener('touchstart', onTouchStart)
        dragBtnRef.current.addEventListener('touchend', onTouchEnd)
        return () => {
            dragSliderRef.current.removeEventListener('touchstart', onTouchStart)
            dragBtnRef.current.removeEventListener('touchend', onTouchEnd)
        }
    }, [])

    return (<div
        style={{
            // @ts-ignore
            '--top': top + 'px',
            '--min-top': minTop + 'px'
        }}
        className='drag-slider'
        ref={dragSliderRef}
    >
        <div
            className='drag-slider-btn'
            ref={dragBtnRef}
        >
            <Iconfont type='iconjian-cuxiantiao' />
        </div>
        <header>{
            typeof title === 'function' ? title() : title
        }</header>
        <div className='drag-slider-content'>
            {children}
        </div>
    </div>)
}

export default DragSlider