import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const RedBorder = styled.div`
  width: 100px;
  margin-top: 0.1rem;
  border: 1px solid red;
  color: red;

  &:hover {
    color: blue;
  }
`

const AppProps = {
  allowDisabled: PropTypes.bool.isRequired,
}

const App = ({ allowDisabled }) => {
  const [disabled, setDisabled] = useState(false)
  const [text, setText] = useState('')

  function handleClick() {
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
    <RedBorder>
      Hello1 {text}!
      <br />
      <button onClick={handleClick} disabled={disabled}>
        Change Text
      </button>
      {allowDisabled ? (
        <label>
          disabled
          <input
            type="checkbox"
            checked={disabled}
            onChange={() => setDisabled(!disabled)}
          />
        </label>
      ) : null}
    </RedBorder>
  )
}
App.propTypes = AppProps

export default App
