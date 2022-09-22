import React from 'react'
import { Alert } from 'react-bootstrap';

const AlertLayout = ({info}) => {
  return info && (
    <Alert variant={info.type}>{info.message}</Alert>
  )
}

export default AlertLayout