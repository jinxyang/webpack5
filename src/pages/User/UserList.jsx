import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Button } from 'antd'

import { useFetch } from 'hooks'

import { userListService } from 'services/user'

const UserList = () => {
  const history = useHistory()
  const [userList, setUserList] = useState([])
  const [{ loading }, fetch] = useFetch(userListService, ({ data, code }) => {
    if (!code) {
      setUserList(data.list)
    }
  })

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '操作',
      align: 'center',
      render: function Operation({ id = 0 }) {
        return (
          <Button onClick={() => history.push(`/users/${id}`)}>查看</Button>
        )
      },
    },
  ]

  useEffect(() => {
    fetch()
  }, [])

  return (
    <Table
      rowKey="id"
      loading={loading}
      dataSource={userList}
      columns={columns}
    />
  )
}

export default UserList
