import { useState } from 'react'

import { fetch } from 'utils'
import { useAppContext } from 'contexts/app-context'

const defaultRequest = { loading: false, data: {}, code: 0, message: '' }
export default function useFetch(service, callback = () => {}) {
  const [request, setRequest] = useState(defaultRequest)
  const {
    actions: { updateStatus },
  } = useAppContext()

  async function start(...params) {
    if (request.loading) return

    setRequest({ ...defaultRequest, loading: true })

    const config = service(...params)
    const response = await fetch(config)

    if (response.code === 401) {
      localStorage.removeItem('token')
      updateStatus(0)
    }

    const newRequest = { ...response, loading: false }
    setRequest(newRequest)
    callback(newRequest)

    return response
  }
  return [request, start]
}
