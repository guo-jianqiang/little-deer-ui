import * as React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';

declare var require: any

export interface IconProps {
    type: string;
    title?: string;
    scriptUrl?: any;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const defaultProps: IconProps = {
    type: '',
    title: '',
    scriptUrl: '//at.alicdn.com/t/font_1618700_bvek2fnb62.js'
}

const Icon: React.SFC<IconProps> = ({type, title, scriptUrl, ...restProps}) => {
    const CustomIcon = createFromIconfontCN({
        scriptUrl: scriptUrl
    })
    return (<CustomIcon type={type} {...restProps} />)
}

Icon.defaultProps = defaultProps

export default Icon
