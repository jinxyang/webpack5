import React, { useReducer, useContext, createContext } from 'react'
import reducer from './reducer'
import getActions from './actions'

const initialState = {
  status: 2, // 0：未登录 1：初始化 2：已就绪
  user: {},
}

const AppContext = createContext(initialState)

export const AppProvider = ({ children = '' }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const { state, dispatch } = useContext(AppContext)
  const actions = getActions(dispatch)
  return {
    state,
    actions,
  }
}
