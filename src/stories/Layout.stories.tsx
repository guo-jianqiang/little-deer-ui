import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {createHashHistory} from 'history'
import Icon from "../components/Iconfont";
import { LayoutProps } from '../components/Layout/Layout';
import Layout from '../components/Layout/Layout'

export default {
  title: 'Example/Layout',
  component: Layout
} as Meta;
// 菜单图标偏移暂未解决 实际项目使用不会出现。
const Template: Story<LayoutProps> = (args) => <Layout {...args}>菜单图标偏移暂未解决 实际项目使用不会出现</Layout>;

const routeItems = [
  {
    path: '/home',
    exact: true,
    meta: {
      tabFixed: true,
      isCache: true,
      icon: () => <Icon type='iconuser' />,
      name: '首页',
    },
    component: () => <div>home</div>,
    routes: [
      {
        path: '/home/1',
        exact: true,
        meta: {
          tabFixed: true,
          isCache: true,
          icon: () => <Icon type='iconuser' />,
          name: '首页1',
        },
        component: () => <div>1</div>,
      },
      {
        path: '/home/inner',
        exact: true,
        meta: {
          tabFixed: true,
          isCache: true,
          icon: () => <Icon type='iconuser' />,
          name: '首页2',
        },
        component: () => <div>2</div>,
        routes: [
          {
            path: '/home/inner/1',
            exact: true,
            meta: {
              tabFixed: true,
              isCache: true,
              icon: () => <Icon type='iconuser' />,
              name: '首页1',
            },
            component: () => <div>inner</div>,
          }
        ]
      }
    ]
  },
  {
    path: '/test',
    exact: true,
    meta: {
      isCache: true,
      icon: 'iconuser',
      name: '测试页',
    },
    component: () => <div>test</div>,
  },
]
export const LayoutDemo = Template.bind({});
LayoutDemo.args = {
  proName: 'admin-demo',
  // aliveControl={aliveControl}
  routeItems: routeItems,
  history: createHashHistory(),
  username: '测试',
  onClickDrop: () => {
    console.log('退出')
  }
}


