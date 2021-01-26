import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';

declare var require: any

export interface IconProps {
    type: string;
    title?: string;
    scriptUrl?: any;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<any>) => void;
}

const defaultProps: IconProps = {
    type: '',
    title: '',
    scriptUrl: require('./font')
}

const Icon: React.SFC<IconProps> = ({type, title, scriptUrl, ...restProps}) => {
    const CustomIcon = createFromIconfontCN({
        scriptUrl: scriptUrl
    })
    return (<CustomIcon type={type} {...restProps} />)
}

Icon.defaultProps = defaultProps

export default Icon
