import React from 'react'
import {Button, Row, Col} from 'react-bootstrap'

const AboutView = () => {
  return (
    <Row className='mt-5' style={{marginRight:0}}>
        <Col className='text-center'>
            <Button
                variant='primary'
                href='https://www.youtube.com/watch?v=1pB66XBzMqo'
                size='lg'
            >
                Visit my channel for more tutorials
            </Button>
        </Col>
    </Row>
  )
}

export default AboutView