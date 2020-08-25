import React, {Component} from 'react';
import CSS from 'csstype'
import './style.less'
export interface PropsType {
    style?: object;
    className?: string;
    /**
     * 加载完成文本
     */
    loadedText?: string;
    /**
     * 是否加载完成
     */
    isLoaded?: boolean;
    /**
     * 加载完成文本
     */
    loadingText?: string;
    /**
     * 加载中dom
     */
    loadingEle?: any;
    /**
     * 调用onLoad之前的临界值，单位是像素
     * @default 10
     */
    onEndReachedThreshold?: number;
    /**
     * 滚动到一定阀值时触发, currentPage: 当前页码； 函数返回一个Promise
     */
    onLoad?: (currentPage?: number) => Promise<boolean>;
}

class ListView extends Component<PropsType, {completed: boolean}> {
    static defaultProps = {
        onEndReachedThreshold: 10,
        loadedText: '没有更多了',
        loadingText: '加载中...'
    }
    constructor(props: PropsType, context) {
        super(props, context);
        this.state = {
            completed:true
        }
    }
    currentPage: number = 1

    onScroll = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 10 && this.state.completed) {
            this.setState({completed: false})
            if (typeof this.props.onLoad === 'function') {
                this.props.onLoad(this.currentPage).then(res => {
                    if (res) {
                        this.setState({completed: true})
                        this.currentPage++
                    }
                })
            }
        }
    }
    render() {
        return (
            <div
                style={this.props.style}
                className={this.props.className + ' list-view'}
                onScroll={this.onScroll}
            >
                {this.props.children}
                {
                    !this.props.isLoaded ?
                        this.props.loadingEle ? this.props.loadingEle
                            : !this.state.completed  && <div className='list-view-loading'>
                                <div className='list-view-loading-icon' />
                                {
                                    this.props.loadingText
                                }
                            </div>
                        : <div className='list-view-loading'>
                            {
                                this.props.loadedText
                            }
                        </div>
                }
            </div>
        );
    }
}

export default ListView;