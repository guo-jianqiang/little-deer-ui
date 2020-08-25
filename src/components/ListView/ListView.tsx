import React, {Component} from 'react';
import CSS from 'csstype'
import './style.less'
export interface PropsType {
    style?: object;
    className?: string;
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

class ListView extends Component<PropsType, {}> {
    static defaultProps = {
        onEndReachedThreshold: 10
    }
    constructor(props: PropsType, context) {
        super(props, context);
    }
    completed: boolean = true
    currentPage: number = 1

    onScroll = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 10 && this.completed) {
            this.completed = false
            if (typeof this.props.onLoad === 'function') {
                this.props.onLoad(this.currentPage).then(res => {
                    if (res) {
                        this.completed = true
                        this.currentPage++
                        console.log(123)
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
            </div>
        );
    }
}

export default ListView;