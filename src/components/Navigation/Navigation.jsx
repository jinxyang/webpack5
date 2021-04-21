import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import NavigationItem from './NavigationItem'

const StyledNavigation = styled.ul`
  margin: 0;
  padding: 8px 16px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  list-style: none;
  cursor: default;
  user-select: none;
`

const Navigation = ({ routes = [] }) => {
  const [activeName, setActiveName] = useState('')
  const [openNames, setOpenNames] = useState([])
  const location = useLocation()
  const history = useHistory()

  const handleClick = (route) => {
    if (location.pathname !== route.path) {
      setActiveName(route.name)
      history.push(route.path)
    }
  }

  const handleOpen = (route) => {
    const nameIndex = openNames.findIndex((name) => name === route.name)
    if (nameIndex >= 0) {
      setOpenNames((names) => {
        const newNames = names.slice()
        newNames.splice(nameIndex, 1)
        return newNames
      })
    } else {
      setOpenNames((names) => [...names, route.name])
    }
  }

  useEffect(() => {
    const currentRoute = routes
      .map((r) => r.children ?? r)
      .flat()
      .find(({ path, regExp }) => {
        return (
          location.pathname === path ||
          (regExp && location.pathname.match(regExp))
        )
      })

    if (currentRoute) {
      setActiveName(currentRoute.name)
    }
  }, [location, routes])

  return (
    <StyledNavigation>
      {routes.map((route, index) => (
        <NavigationItem
          key={index}
          route={route}
          activeName={activeName}
          openNames={openNames}
          onClick={handleClick}
          onOpen={handleOpen}
        />
      ))}
    </StyledNavigation>
  )
}

export default Navigation
