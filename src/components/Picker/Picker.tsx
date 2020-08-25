import React, {FunctionComponent}  from 'react'
import ReactDom from 'react-dom'
import './style.less'

interface PickerProps {
    /**
     * 是否显示遮罩
     * @default true
     */
    mask?: boolean,
    /**
     * 开启关闭
     * @default false
     */
    visible:boolean,
    /**
     * 关闭回调
     */
    onCancel: () => void,
}

const Picker:FunctionComponent<PickerProps> = ({mask = true, visible = false, onCancel, children}) => {
    let pickWrapRef
    const handleClick = e => {
        if (!pickWrapRef.contains(e.target)) {
            typeof onCancel === 'function' && onCancel()
        }
    }

    const Popup = () => {
        return (
            <div className='picker'>
                {
                    mask ? <div className='picker-mask' /> : null
                }
                <div className='picker-wrap' onClick={handleClick}>
                    <div className='picker-wrap-content' ref={ref => pickWrapRef = ref} >
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