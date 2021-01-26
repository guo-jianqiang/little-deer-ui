import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {createHashHistory} from 'history'

import { LayoutProps } from '../components/Layout/LayoutInterface';
import Layout from '../components/Layout/Layout'

export default {
  title: 'Example/Layout',
  component: Layout
} as Meta;

const Template: Story<LayoutProps> = (args) => <Layout {...args}>layout</Layout>;

const routeItems = [
  {
    path: '/home',
    exact: true,
    meta: {
      tabFixed: true,
      isCache: true,
      icon: 'iconuser',
      name: '首页',
    },
    component: () => <div>home</div>,
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


