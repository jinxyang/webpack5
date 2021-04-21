import React from 'react'
import { render } from 'react-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'antd/dist/antd.css'
import 'antd/dist/antd.dark.css'

import config from './config'
import { AppProvider } from 'contexts/app-context'
import App from './App'

document.title = config.name

render(
  <ConfigProvider locale={zhCN}>
    <AppProvider>
      <App />
    </AppProvider>
  </ConfigProvider>,
  document.getElementById('root'),
)
