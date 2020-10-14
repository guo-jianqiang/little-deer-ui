import React, {SFC, useEffect}  from 'react'
import ReactDom from 'react-dom'
import CSS from 'csstype'
import './style.less'

interface PickerProps {
    /**
     * 弹出的位置
     * @default 'bottom'
     */
    placement?: 'top' | 'right' | 'bottom' | 'left' ,
    /**
     * 是否显示遮罩
     * @default true
     */
    mask?: boolean,
    /**
     * 开启关闭
     * @default 'false'
     */
    visible:boolean,
    /**
     * 关闭回调
     */
    onCancel: () => void,
}

const top: CSS.Properties = {
    left: 0,
    top: 0,
    maxHeight: '50%',
    width: '100%',
    animationName: 'slideInTop'
}

const bottom: CSS.Properties = {
    left: 0,
    bottom: 0,
    maxHeight: '50%',
    width: '100%',
    animationName: 'slideInUp'
}

const left: CSS.Properties = {
    left: 0,
    bottom: 0,
    maxWidth: '50%',
    height: '100%',
    animationName: 'slideInLeft'
}
const right: CSS.Properties = {
    bottom: 0,
    right: 0,
    maxWidth: '50%',
    height: '100%',
    animationName: 'slideInRight'
}


const pickStyles: object = {
    top,
    bottom,
    left,
    right
}

const Picker:SFC<PickerProps> = ({placement = 'bottom', mask = true, visible = false, onCancel, children}) => {
    let pickWrapRef: HTMLElement | null
    const handleClick = e => {
        if (!pickWrapRef.contains(e.target)) {
            typeof onCancel === 'function' && onCancel()
        }
    }

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [visible])

    const Popup = () => {
        return (
            <div className='picker'>
                {
                    mask ? <div className='picker-mask' /> : null
                }
                <div className='picker-wrap' onClick={handleClick}>
                    <div
                        style={pickStyles[placement] || pickStyles['bottom']}
                        className='picker-wrap-content'
                        ref={ref => pickWrapRef = ref}
                    >
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        )
    }

    return visible && ReactDom.createPortal(Popup(), document.body)
}

export default Picker