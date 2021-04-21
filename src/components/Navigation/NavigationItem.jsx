import React from 'react'
import styled from 'styled-components'
import { blue } from '@ant-design/colors'

import NavigationFolder from './NavigationFolder'

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  padding: 8px 16px;
  transition: all 0.2s;
  border-radius: 8px;
  background: ${(props) => (props.active ? blue.primary : 'transparent')};

  &:hover {
    background: ${(props) =>
      props.active ? blue.primary : 'rgba(255, 255, 255, 0.1)'};
  }
`
const StyledIcon = styled.span`
  margin-right: 16px;
`
const StyledText = styled.span`
  flex: 1;
`

const NavigationItem = ({
  route = {},
  activeName = '',
  openNames = [],
  onClick = () => {},
  onOpen = () => {},
}) => {
  return route.children ? (
    <NavigationFolder
      route={route}
      activeName={activeName}
      openNames={openNames}
      onOpen={onOpen}
      onClick={onClick}
    />
  ) : route.navigation ? (
    <StyledItem
      active={activeName.indexOf(route.name) === 0}
      onClick={() => onClick(route)}
    >
      {route.icon && <StyledIcon>{route.icon}</StyledIcon>}
      <StyledText>{route.title}</StyledText>
    </StyledItem>
  ) : null
}

export default NavigationItem
