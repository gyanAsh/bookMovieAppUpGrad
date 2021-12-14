import React from 'react'
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import './Header.css'

const Header = () => {
    return (
        <div className="headerContainer">
            <img src={logo} alt='logo'/>
            <div>
                <Button variant='contained' color='default'>Login</Button>
                <Button variant='contained' color='default'>Logout</Button>
                <Button variant='contained' color='primary'>Book Show</Button>
            </div>
            
        </div>
    )
}

export default Header