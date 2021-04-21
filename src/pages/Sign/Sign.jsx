import React from 'react'
import styled from 'styled-components'
import { Form, Input, Button, Card } from 'antd'

import { useAppContext } from 'contexts/app-context'
import { useFetch } from 'hooks'
import { loginService } from 'services/account'

const StyledSign = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

const Sign = () => {
  const {
    actions: { updateStatus },
  } = useAppContext()

  const [{ loading }, login] = useFetch(loginService, ({ data, code }) => {
    if (!code) {
      localStorage.setItem('token', data.token)
      updateStatus(2)
    }
  })

  const handleLogin = ({ username, password }) => {
    login(username, password)
  }

  return (
    <StyledSign>
      <Card>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleLogin}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </StyledSign>
  )
}

export default Sign
