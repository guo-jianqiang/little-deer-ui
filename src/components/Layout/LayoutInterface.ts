import React from "react";
import {History} from "history";
import Tabs from './layoutcomponents/Tabs/Tabs'
import Menu from './layoutcomponents/Menu/Menu'
import Header from './layoutcomponents/Header/Header'
import Breadcrumb from './layoutcomponents/Breadcrumb/Breadcrumb'
export interface LayoutStyle extends React.CSSProperties {
  '--layout-menu-width': string;
}

type ComponentType = React.ComponentType<any> & {name: string}

export interface RouteItem {
  path: string;
  exact: boolean;
  meta: {
    tabFixed?: boolean;
    isCache?: boolean;
    hidden?: boolean;
    name: string;
    icon: Function | string;
  };
  component: ComponentType;
  routes?: Array<RouteItem>;
}

export interface aliveControlInterface {
  dropByCacheKey: (cacheKey: string) => void;
  refreshByCacheKey: (cacheKey: string) => void;
  getCachingKeys: () => Array<string>;
  clearCache: () => void;
}
export interface LayoutProps {
  /**
   *  图标
   */
  logo?: any;
  /**
   *  头像
   */
  avatar?: React.ReactNode;
  /**
   *  项目名
   */
  proName?: string;
  /**
   * aliveControl 路由缓存函数，若要使用请安装[react-router-cache-route](https://github.com/CJY0208/react-router-cache-route)
   * 并将dropByCacheKey、refreshByCacheKey方法放入该对象导入，导入改对象后默认开启路由缓存功能
   */
  aliveControl?: aliveControlInterface;
  /**
   *  登录页路由
   *  @default /login
   */
  loginPath?: string;
  /**
   *  路由表
   */
  routeItems: Array<RouteItem>;
  /**
   * history 对象
   */
  history: History;
  /**
   *  用户名
   */
  username: string;
  /**
   *  退出函数
   */
  onClickDrop: () => void;
}
export type LayoutInnerComponent = {
  Tabs: typeof Tabs;
  Header: typeof Header;
  Menu: typeof Menu;
  Breadcrumb: typeof Breadcrumb;
}

export type LayoutType = React.FC<LayoutProps> & LayoutInnerComponent