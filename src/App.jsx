import React, { useEffect } from 'react'

import { useAppContext } from 'contexts/app-context'

import Layout from './layout'
import Sign from 'pages/Sign'

const components = {
  0: Sign,
  2: Layout,
}

const App = () => {
  const {
    state,
    actions: { updateStatus },
  } = useAppContext()

  useEffect(() => {
    console.log('App rendered.')
    if (!localStorage.getItem('token')) {
      updateStatus(0)
    }
  }, [])

  const StatusComponent = components[state.status]
  return <StatusComponent />
}

export default App
