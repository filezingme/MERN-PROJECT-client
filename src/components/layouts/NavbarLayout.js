import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Nav, Button, Navbar} from 'react-bootstrap'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import { authContext } from '../../contexts/authContext'

const NavbarLayout = () => {

    const {
        authState: {
            user: {username}
        },
        logoutUser
    } = useContext(authContext)

    const handleLogout = () => logoutUser()

    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='font-weight-bolder text-white'>
                <img 
                    src={learnItLogo}
                    alt='learnItLogo'
                    width={32}
                    height='32'
                    className='me-2'
                />
                LearnIt
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                    <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>
                        About
                    </Nav.Link>
                </Nav>
                
                <Nav>
                    <Nav.Link className='font-weight-bolder text-white' disabled>
                        Welcome {username}
                    </Nav.Link>
                    <Button variant='secondary' className='font-weight-bolder text-white' onClick={handleLogout}>
                        <img src={logoutIcon} alt='logoutIcon' width={32} height={32} className='me-2' />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarLayout