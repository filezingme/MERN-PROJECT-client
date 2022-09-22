import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { authContext } from '../../contexts/authContext'
import AlertLayout from '../layouts/AlertLayout'

const RegisterForm = () => {

    //Context
    const { registerUser } = useContext(authContext)
  
    //Local state
    const [registerForm, setRegisterForm] = useState({
      username: '',
      password: '',
      confirmPassword: ''
    })
  
    const { username, password, confirmPassword } = registerForm
    const [ alert, setAlert ] = useState(null)
  
    const onChangeRegisterForm = event => setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })
  
    const handleRegister = async event => {
      event.preventDefault()

      if(password !== confirmPassword) {
        setAlert({type: 'danger', message: 'Passwords do not match'})
        setTimeout(() => setAlert(null), 3000)
        return
      }
  
      try {
  
        const registerData = await registerUser(registerForm)
  
        if(!registerData.success) {
          setAlert({type: 'danger', message: registerData.message})
  
          //show alert for a few second and then hide it
          setTimeout(() => setAlert(null), 3000)
        }
  
      } catch (error) {
        console.log(error)
      }
    }

    return (<>
        <Form className='my-4' onSubmit={handleRegister}>

            <AlertLayout info={alert} />

            <Form.Group>
            <Form.Control type='text' placeholder='Username' name='username' className='my-3' required value={username} onChange={onChangeRegisterForm} />
            </Form.Group>
            
            <Form.Group>
            <Form.Control type='password' placeholder='Password' name='password' className='my-3' required value={password} onChange={onChangeRegisterForm} />
            </Form.Group>
            
            <Form.Group>
            <Form.Control type='password' placeholder='Confirm Password' name='confirmPassword' className='my-3' required value={confirmPassword} onChange={onChangeRegisterForm} />
            </Form.Group>
            
            <Button variant='success' type='submit' className='my-3'>Register</Button>
        </Form>
        <p>
            Already have an account? 
            <Link to='/login'>
                <Button variant='info' size='sm' className='ms-2'>Login</Button>
            </Link>
        </p>
    </>
    )
}

export default RegisterForm