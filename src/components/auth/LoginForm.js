// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { authContext } from '../../contexts/authContext'
import AlertLayout from '../layouts/AlertLayout'

const LoginForm = () => {

  //Context
  const { loginUser } = useContext(authContext)

  //Router
  const navigate = useNavigate();

  //Local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const { username, password } = loginForm
  const [ alert, setAlert ] = useState(null)

  const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

  const handleLogin = async event => {
    event.preventDefault()

    try {

      const loginData = await loginUser(loginForm)

      if(loginData.success) {
        //navigate('/dashboard')
      }
      else {
        setAlert({type: 'danger', message: loginData.message})

        //show alert for a few second and then hide it
        setTimeout(() => setAlert(null), 3000)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (<>
    <Form className='my-4' onSubmit={handleLogin}>

      <AlertLayout info={alert} />

      <Form.Group>
        <Form.Control type='text' placeholder='Username' name='username' className='my-3' required value={username} onChange={onChangeLoginForm} />
      </Form.Group>

      <Form.Group>
        <Form.Control type='password' placeholder='Password' name='password' className='my-3' required value={password} onChange={onChangeLoginForm} />
      </Form.Group>

      <Button variant='success' type='submit' className='my-3'>Login</Button>
    </Form>
    <p>
      Don't have an account?
      <Link to='/register'>
        <Button variant='info' size='sm' className='ms-2'>Register</Button>
      </Link>
    </p>
  </>
  )
}

export default LoginForm