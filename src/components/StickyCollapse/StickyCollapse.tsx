import React from 'react'
import Icon from "../Iconfont";
import classnames from 'classnames'
import './style.less'

export interface StickyCollapseProps {
    className?: string;
    style?: React.CSSProperties;
}

export type StickyCollapsePanelProps = {
    header: React.ReactNode;
}

export interface StickyCollapseType extends React.SFC<StickyCollapseProps> {
    Panel: React.SFC<StickyCollapsePanelProps>;
}

const StickyCollapse: StickyCollapseType = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classnames('bui-sticky-collapse', className)} {...otherProps}>
            {children}
        </div>
    )
}

const StickyCollapsePanel: React.SFC<StickyCollapsePanelProps> = (props) => {
    const [isCollapse, setCollapse] = React.useState(true)
    const { children, header } = props
    let wrapperEl: HTMLElement;
    const handleClick = () => {
        // console.log(wrapperEl.getBoundingClientRect(), wrapperEl.offsetTop, wrapperEl.parentElement.scrollTop)
        const { offsetTop } = wrapperEl
        const { scrollTop } = wrapperEl.parentElement
        if (scrollTop > offsetTop) {
            wrapperEl.parentElement.scrollTop = offsetTop
        }
        setCollapse(!isCollapse)
    }

    return (
        <div className='bui-sticky-collapse-panel' ref={ref => { wrapperEl = ref }}>
            <header className='bui-sticky-collapse-panel-header'>
                <span>{header}</span>
                <Icon type='icon-Next' className={isCollapse ? '' : 'collapse'} onClick={handleClick} />
            </header>
            <section style={{ display: isCollapse ? 'block' : 'none' }}>
                {children}
            </section>
        </div>
    )
}

StickyCollapse.Panel = StickyCollapsePanel

export default StickyCollapse
