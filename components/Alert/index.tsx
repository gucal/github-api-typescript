import React from 'react'
import AlertArea from './style'

interface AlertProps {
  children: React.ReactNode
  type?: 'success' | 'error'
}

const Alert: React.FC<AlertProps> = ({ children, type }) => {
  return <AlertArea type={type}>{children}</AlertArea>
}

export default Alert
