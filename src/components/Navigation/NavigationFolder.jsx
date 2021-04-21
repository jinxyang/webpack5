import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RightOutlined } from '@ant-design/icons'

import NavigationItem from './NavigationItem'

const StyledFolder = styled.li`
  margin: 8px 0;
  transition: all 0.2s;
  border-radius: 8px;
  background: ${(props) =>
    props.open ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`
const StyledTitle = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 8px 16px;
`
const StyledText = styled.span`
  flex: 1;
  margin-right: 16px;
`
const StyledFolderIcon = styled.span.attrs(() => ({}))`
  transform: ${(props) => (props.rotate ? 'rotate(90deg)' : 'none')};
  transition: all 0.2s;
`
const StyledList = styled.ul`
  height: ${(props) => (props.open ? 'auto' : 0)};
  margin: 0;
  padding: 0 16px;
  padding-bottom: ${(props) => (props.open ? '8px' : 0)};
  overflow: hidden;
  transition: height 0.4s cubic-bezier(0.2, 0, 0, 1), padding-bottom 0.1s;
  list-style: none;
`

const NavigationFolder = ({
  route = {},
  activeName = '',
  openNames = [],
  onClick = () => {},
  onOpen = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(openNames.includes(route.name))
  }, [openNames, route.name])

  return (
    <StyledFolder open={isOpen}>
      <StyledTitle onClick={() => onOpen(route)}>
        <StyledText>{route.title}</StyledText>
        <StyledFolderIcon rotate={isOpen ? 1 : 0}>
          <RightOutlined />
        </StyledFolderIcon>
      </StyledTitle>
      <StyledList open={isOpen}>
        {route.children.map((child, index) => (
          <NavigationItem
            key={index}
            route={child}
            activeName={activeName}
            openNames={openNames}
            onClick={() => onClick(child)}
            onOpen={onOpen}
          />
        ))}
      </StyledList>
    </StyledFolder>
  )
}

export default NavigationFolder
