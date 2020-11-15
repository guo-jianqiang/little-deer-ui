import React, {FC,useRef, useState} from "react";
import './style.less'

const distance = 6

export type placementType = 'top' | 'left' | 'right' | 'bottom';

export interface TooltipProps {
    /**
     * 标题
     */
    title: string;
    /**
     * 鼠标移出后延时多少才隐藏 Tooltip，单位：ms
     */
    mouseLeaveDelay?: number;
    /**
     * 气泡框位置
     * @default top
     */
    placement?: placementType;
}

const top = (visible: boolean) => {
    const top = {
        top: visible ? -distance + 'px' : '-12px',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        '--tooltip-after-top': '100%',
        '--tooltip-after-left': '50%',
        '--tooltip-after-transform': 'translateX(-50%)',
        '--tooltip-after-border-color': 'rgba(0,0,0,.45) transparent transparent transparent'
    }
    return top
}

const right = (visible: boolean) => {
    const right = {
        top: '50%',
        right: visible ? -distance + 'px' : '-12px',
        transform: 'translate(100%, -50%)',
        '--tooltip-after-top': '50%',
        '--tooltip-after-left': '-8px',
        '--tooltip-after-transform': 'translateY(-50%)',
        '--tooltip-after-border-color': 'transparent rgba(0,0,0,.45) transparent transparent'
    }
    return right
}
const bottom = (visible: boolean) => {
    const bottom = {
        top: visible ? `calc(100% + ${distance}px)` : 'calc(100% + 12px)',
        left: '50%',
        transform: 'translate(-50%)',
        '--tooltip-after-top': '-8px',
        '--tooltip-after-left': '50%',
        '--tooltip-after-transform': 'translateX(-50%)',
        '--tooltip-after-border-color': 'transparent transparent rgba(0,0,0,.45) transparent'
    }
    return bottom
}
const left = (visible: boolean) => {
    const left = {
        top: '50%',
        left: visible ? -distance + 'px' : '-12px',
        transform: 'translate(-100%, -50%)',
        '--tooltip-after-top': '50%',
        '--tooltip-after-left': '100%',
        '--tooltip-after-transform': 'translateY(-50%)',
        '--tooltip-after-border-color': 'transparent transparent transparent rgba(0,0,0,.45)'
    }
    return left
}

const tooltipTitleStyle = {top, right, bottom, left}

const ToolTip: FC<TooltipProps> = ({title,placement, mouseLeaveDelay, children}) => {
    const timer = useRef(null)
    const [visible, setVisible] = useState(false)
    const onMouseEnter = () => {
        clearTimeout(timer.current)
        setVisible(true)
    }
    const onmouseleave = () => {
        timer.current = setTimeout(() => {
            setVisible(false)
        }, mouseLeaveDelay)
    }
    return (<div
        className='tooltip'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onmouseleave}
    >
        {
            children
        }
        <span
            className={'tooltip-title' + `${visible ? ' tooltip-show' : ''}`}
            style={(typeof tooltipTitleStyle[placement] === 'function' && tooltipTitleStyle[placement](visible)) || tooltipTitleStyle['top'](visible)}
        >
            {title}
        </span>
    </div>)
}

ToolTip.defaultProps = {
    placement: 'top',
    mouseLeaveDelay: 100
}

export default ToolTip