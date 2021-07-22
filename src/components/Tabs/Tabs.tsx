import React, { useEffect, useState } from 'react'
import style from './style.less'

export interface ITabs {
  className?: string;
  style?: React.CSSProperties;
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  children?: any;
}

export interface ITabPane {
  className?: string;
  style?: React.CSSProperties;
  /**
   * @description 是否渲染隐藏tabPane children
   * @default false
   */
  forceRender?: Boolean;
  active?: Boolean;
  key: string;
  tab: React.ReactNode | string;
}

type TabsType = {
  TabPane?: typeof TabPane
} & React.ForwardRefExoticComponent<ITabs & React.RefAttributes<HTMLDivElement>>

const Tabs: TabsType = React.forwardRef(({ defaultActiveKey, activeKey, onChange, className, children, ...reset }, ref) => {
  const [stateKey, setStateKey] = useState(defaultActiveKey)
  useEffect(() => {
    if (typeof activeKey !== 'undefined') {
      setStateKey(activeKey)
    }
  }, [activeKey])

  const handleClickTab = (key: string) => () => {
    onChange && onChange(key)
    if (typeof activeKey !== 'undefined') return
    setStateKey(key)
  }

  const renderHeader = () => (
    <div className={style.tabsHeader}>
      {
        React.Children.map(children, (child: JSX.Element, i) => {
          const { props, key } = child
          const { tab } = props
          return <div
            key={i}
            onClick={handleClickTab(key)}
            className={`${style.tabsHeaderTitle} ${stateKey === key ? style.tabsActive : ''}`}
          >
            {tab}
          </div>
        })
      }
    </div>
  )

  const renderPane = () => (
    <div className={style.tabsContent}>
      {
        React.Children.map(children, (child: JSX.Element) => {
          const { key } = child
          return React.cloneElement(child, { active: key === stateKey })
        })
      }
    </div>
  )

  return (<div className={`${style.tabs} ${className}`} {...reset} ref={ref}>
    {renderHeader()}
    {renderPane()}
  </div>)
})

const TabPane: React.FC<ITabPane> = ({
  forceRender = false,
  key,
  tab,
  active,
  className,
  style: tabPaneStyle,
  children,
  ...reset
}) => {
  const [visited, setVisited] = useState(forceRender)

  useEffect(() => {
    if (active) {
      setVisited(true)
    }
  }, [active])

  return <div
    className={children ? `${style.tabsPane} ${className}` : ''}
    style={{
      display: active ? 'block' : 'none',
      ...tabPaneStyle
    }}
    {...reset}
  >
    {(visited) && children }
  </div>
}

Tabs.TabPane = TabPane

export default Tabs