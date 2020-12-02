# webpack5



## init

```bash
npm init -y
```

---

## webpack

```bash
npm i -D webpack webpack-cli html-webpack-plugin
```

webpack.config.js

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [path.resolve(__dirname, './src/index.js')],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
}

```

src/index.js

```javascript
const element = document.createElement('div')
element.innerHTML = 'Hello React!'

const root = document.getElementById('root')
root.appendChild(element)

```

src/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>React</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

package.json

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

```bash
npm run build
```

---

## babel

```bash
npm i -D @babel/core @babel/preset-env babel-loader
```

babel.config.js

```javascript
module.exports = (api) => {
  api.cache(true)

  const presets = ['@babel/env']

  return {
    presets,
  }
}

```

.browserslistrc

```
> 1%
Last 2 versions
```

添加配置

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
```

```bash
npm run build
```

---

## react

```bash
npm i react react-dom prop-types
```

```bash
npm i -D @babel/preset-react
```

babel.config.js

```javascript
module.exports = (api) => {
  api.cache(true)

  const presets = ['@babel/env', '@babel/react']

  return {
    presets,
  }
}

```

src/App.jsx

```javascript
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const AppProps = {
  allowDisabled: PropTypes.bool.isRequired,
}

const App = ({ allowDisabled }) => {
  const [disabled, setDisabled] = useState(false)
  const [text, setText] = useState('')

  function handleClick () {
    if (disabled) return
    setText(text === 'React' ? 'Webpack' : 'React')
  }

  useEffect(() => {
    setText('React')
  }, [])

  useEffect(() => {
    if (!text) return
    console.log(`text changed to ${text}`)
  }, [text])

  return (
    <div>
      Hello {text}!
      <br/>
      <button onClick={handleClick} disabled={disabled}>Change Text</button>
      {
        allowDisabled
          ? <label>disabled<input type="checkbox" checked={disabled} onChange={() => setDisabled(!disabled)} /></label>
          : null
      }
    </div>
  )
}
App.propTypes = AppProps

export default App

```

src/index.js

```javascript
import React from 'react'
import { render } from 'react-dom'

import App from './App'

render(<App />, document.getElementById('root'))

```

---

## eslint

```bash
npm i -D eslint eslint-webpack-plugin babel-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-config-standard eslint-formatter-pretty
```

.eslintrc.js

```javascript
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {},
}

```

webpack.config.js

```javascript
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  new ESLintPlugin({
    extensions: ['js', 'jsx'],
    formatter: 'pretty',
  }),
}

```

package.json

```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.jsx"
  }
}
```

---

## server

```bash
npm i -D express webpack-dev-middleware webpack-hot-middleware @pmmmwh/react-refresh-webpack-plugin react-refresh
```

server.js

```javascript
const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(devMiddleware(compiler))
app.use(
  hotMiddleware(compiler, {
    log: false,
    heartbeat: 5000,
  }),
)
app.listen(9527)

```

webpack.dev.js

```javascript
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?timeout=10000&reload=true&quiet=true',
    path.resolve(__dirname, './src/index.js'),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              require('react-refresh/babel'),
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
}
```

package.json

```json
{
  "scripts": {
    "start": "node ./server.js"
  }
}
```



## styled-component

```bash
npm i styled-components
```

App.jsx

```javascript
import styled from 'styled-components'

const RedBorder = styled.div`
  border: 1px solid red;
`
const App = () => {
  return (
		<RedBorder>
    	...
    </RedBorder>
  )
}
```



## prettier

```bash
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

.prettierrc.js

```javascript
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
}

```

.eslintrc.js

```javascript
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/standard',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'error',
  },
}

```

## stylelint

```bash
npm i -D stylelint stylelint-order stylelint-config-standard stylelint-config-property-sort-order-smacss
```

stylelint.config.js

```javascript
const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate')

module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-property-sort-order-smacss',
  ],
  rules: {
    'order/properties-order': [sortOrderSmacss()],
  },
}

```

package.json

```json
{
  "scripts": {
    "lint:style": "stylelint src"
  }
}
```



## husky && lint-staged && commitlint

```bash
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```

package.json

```json
{
  "scripts": {
    "format:js": "prettier --write src",
    "format:style": "stylelint \"**/*.scss\" --syntax scss --fix",
    "format": "npm run format:script && npm run format:style",
  } 
}
```

commitlint.config.js

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
}

```

husky.config.js

```javascript
module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
}

```

lint-staged.config.js

```javascript
module.exports = {
  'src/**/*.js?(x)': ['npm run lint', 'npm run format', 'git add'],
}

```



