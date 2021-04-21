import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import routes from './routes'
import Navigation from 'components/Navigation'

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`
const Aside = styled.aside`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  overflow-x: hidden;
  overflow-y: scroll;
`

const Layout = () => {
  return (
    <Router>
      <Wrap>
        <Aside>
          <Navigation routes={routes} />
        </Aside>
        <Switch>
          {routes
            .map((r) => r.children ?? r)
            .flat()
            .map(({ name, path, component, exact }) => (
              <Route
                path={path}
                component={component}
                exact={!!exact}
                key={name}
              />
            ))}
        </Switch>
      </Wrap>
    </Router>
  )
}

export default Layout
