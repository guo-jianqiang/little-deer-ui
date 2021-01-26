/** @format */

import React, {FC, useEffect, useState} from 'react'
import {Menu as AntdMenu} from 'antd'
import 'antd/lib/menu/style'
import {MenuInfo} from 'rc-menu/lib/interface'
import {RouteItem} from '../../Layout'
import {History} from 'history'
import {getTreePath} from '../../../../lib/helpers'
import Icon from '../../../../components/Iconfont'

const {Item, SubMenu} = AntdMenu

export interface MenuProps {
  collapsed: boolean;
  routeItems: Array<RouteItem>;
  history: History;
}

const Menu: FC<MenuProps> = props => {
  const {collapsed, routeItems, history} = props
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([])
  useEffect(() => {
    setSelectedKeys([history.location.pathname])
  }, [history.location.pathname])
  const renderIcon = (route: RouteItem) =>
    typeof route.meta.icon === 'function' ? route.meta.icon() : <Icon type={route.meta.icon} />
  const renderSubMenu = (route: RouteItem) => (
    <SubMenu key={route.path} title={route.meta.name} icon={renderIcon(route)}>
      {renderMenuItem(route?.routes)}
    </SubMenu>
  )
  const renderMenuItem = (routes: Array<RouteItem> = []) =>
    routes?.map(route => {
      if (route.routes && route.routes.length) return renderSubMenu(route)
      return (
        <Item key={route.path} title={route.meta.name} icon={renderIcon(route)}>
          {route.meta.name}
        </Item>
      )
    })
  const handleClickMenu = (menu: MenuInfo) => {
    // @ts-ignore
    history.push(menu.key)
  }
  const {pathname} = history.location
  const defaultOpenKeys = getTreePath(routeItems, route => route.path === pathname, 'routes').map(
    (route: RouteItem) => route.path,
  )
  return (
    <AntdMenu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKeys}
      inlineCollapsed={collapsed}
      defaultOpenKeys={defaultOpenKeys}
      onClick={handleClickMenu}>
      {renderMenuItem(routeItems)}
    </AntdMenu>
  )
}

export default Menu
