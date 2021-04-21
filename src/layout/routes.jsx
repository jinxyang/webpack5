import React from 'react'
import { DashboardOutlined, UsergroupAddOutlined } from '@ant-design/icons'

import Dashboard from 'pages/Dashboard'
import { UserList, UserDetail } from 'pages/User'

const iconStyle = {
  position: 'relative',
  top: '1px',
  fontSize: '18px',
}

const routes = [
  {
    name: 'dashboard',
    path: '/',
    title: '首页',
    component: Dashboard,
    icon: <DashboardOutlined style={iconStyle} />,
    navigation: true,
    exact: true,
  },
  {
    name: 'user',
    title: '用户管理',
    navigation: true,
    children: [
      {
        name: 'user-list',
        path: '/users',
        title: '用户列表',
        component: UserList,
        icon: <UsergroupAddOutlined style={iconStyle} />,
        navigation: true,
        exact: true,
      },
      {
        name: 'user-list-detail',
        path: '/users/:id',
        title: '用户详情',
        regExp: /\/users\/\w/,
        component: UserDetail,
        exact: true,
      },
    ],
  },
]

export default routes
