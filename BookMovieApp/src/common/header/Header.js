import React,{useState} from 'react'
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import {Tabs,Tab,Box,createTheme, Input ,Typography} from '@mui/material';
import { red } from '@mui/material/colors';
import Modal from 'react-modal'

import './Header.css'
import { TextField  } from '@material-ui/core';



const Header = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const loginPopup = () => setOpen(!open);
    const handleChange=(event,newValue)=>setValue(newValue);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
          height:'auto'
        },
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={2}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
    }
    
    const redColor = red[500];

    return (
        <div className="headerContainer">
            <img src={logo} alt='logo'/>
            <div>
                <Button variant='contained' color='primary'>Book Show</Button>
                <Button variant='contained' color='default' onClick={loginPopup}>Login</Button>
                <Button variant='contained' color='default'>Logout</Button>
            </div>
            <Modal isOpen={open} onRequestClose={loginPopup} style={customStyles} onClose={loginPopup} >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor='secondary'
                    indicatorColor='secondary'
                    sx={{ display: 'flex',
                    justifyContent: 'space-between',
                     
                    }}>
                    <Tab selected sx={{width:140}} label="Login"/>
                    <Tab sx={{width:140}} label="Register"/>
                </Tabs>  
                <TabPanel value={value} index={0}>
                    <Login setOpen={setOpen}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Register/>
                </TabPanel>
            </Modal>
        </div>
    )
}

export default Header

const ariaLabel = { 'aria-label': 'description' };
const Login = ({setOpen}) => {
    const [value, setValue] = useState({
        name:"",
        password: "",
        complete:false,
    })

    const handleChange = name => e => {
        setValue({...value,[name]:e.target.value })
    }

    const submitForm =()=> {
        // setValue({...value,complete:true })
    }
    if (value.complete)
    setOpen(!value.complete);

    return (
        <div>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      required
      noValidate
      autoComplete="off"
        ><br/>  <form>
                    <TextField label="Username" error={true} onChange={ handleChange("name") } placeholder="Enter user name" fullWidth required /><br/><br/>
                <TextField label="Password" onChange={ handleChange("password") } placeholder="Enter user password" type="password" fullWidth required /><br/><br/>
                <Button type="submit" onClick={submitForm("complete")} variant='contained' color='primary'>Login</Button>
                </form>
    </Box>
           
        </div>
    )
}

const Register = () => {
    const [value, setValue] = useState({
        firstName: "",
        lastName: "",
        email:"",
        password: "",
        contactNo: null,
        complete:true
    })

    const handleChange = name => e => {
        setValue({...value,[name]:e.target.value})
    }
    const registerForm = () => {
        if (value.firstName === "a")
            setValue(value.complete=true)
    }
    return (
        <div>
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      required
      noValidate
      autoComplete="off"
            ><br />
                <form>
                <Input  placeholder="First Name" inputProps={ariaLabel} onChange={handleChange("firstName")} required /><br/><br/>
                <Input placeholder="Last Name" inputProps={ariaLabel} onChange={handleChange("lastName")} required/><br/><br/>
                <Input placeholder="Email" type="email" inputProps={ariaLabel} onChange={handleChange("email")} required /><br/><br/>
                <Input placeholder="Password" type="password" inputProps={ariaLabel}onChange={handleChange("password")} required /><br/><br/>
                <Input placeholder="Contact No." type="number" inputProps={ariaLabel} onChange={handleChange("contactNo")} required /><br /><br />
                    {value.complete && <div><Typography>Registration Successful. Please Login!</Typography><br/></div>}
                <Button type="submit" onClick={registerForm} variant='contained' color='primary'>Register</Button>
                </form>
    </Box>
        </div>
    )
}