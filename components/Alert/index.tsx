import React from 'react'
import AlertArea from './style'

interface AlertProps {
  children: React.ReactNode
}

const Alert: React.FC<AlertProps> = ({ children }) => {
  return <AlertArea>{children}</AlertArea>
}

export default Alert
