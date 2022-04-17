import React ,{useState} from 'react';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { Container, Paper, Typography, Grid, Avatar ,IconButton, Button} from '@material-ui/core';
import useStyles from './styles'
import {useHistory} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'
import {signin,signup} from '../../actions/auth'
import Input from './Input'
import icon from './icon'
const initialState ={
    firstName:'',
    lastName:'',
    password:'',
    email:'',
    confirmPassword:''
  }
const Auth = () => { 
    const classes = useStyles();
    const history =useHistory();
    const [formData ,setFormData] =useState();
    const [isSignup ,setIsSignup]=useState(false);
    const [showPassword ,setshowPassword]= useState();
    const dispatch =useDispatch();
    const handleShowPassword =() => setshowPassword((prevShowPassword)=>!prevShowPassword); 
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history));
        }
        else{
            dispatch(signin(formData,history));
        }
         
    }; 
    const handleChange=(e)=>
    {
        setFormData({...formData ,[e.target.name]:e.target.value})
    };
    const SwitchMode=()=>{
       setIsSignup((prevIsSignup)=>!prevIsSignup);
       handleShowPassword(false);
    };
    const googleSuccess = async (res) =>{
         const result = res?.profileObj;
         const token = res?.tokenId;
         try {
             dispatch({ type :'AUTH' , data: {result ,token}});
            history.push('/');
            } catch (error) {
             console.log(error);
         }
    }
    const googleFailure = () =>{
        console.log("Unsuccessful google sign in");
    }
      return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutLinedIcon/>
            </Avatar> 
            <Typography variant="h5">
               {isSignup? "Sign Up":"Sign In"}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                     {
                         isSignup && (
                             <>
                             <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                             <Input name="lastName"  label="Last Name" handleChange={handleChange} half/>
                             </>
                         )
                     }
                     <Input name="email"  label="Email Address" handleChange={handleChange} type="email"/>
                     <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                     {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type= "password"/>}
                     
                </Grid>
               
                 
                <Button type ="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit}>{isSignup ? 'Sign Up' :'Sign In'}</Button>
                <GoogleLogin
                    clientId='721895977007-709vutvh60leq852hq3d6cd93at8olou.apps.googleusercontent.com'
                    render={(renderProps)=>(
                        <Button 
                          className={classes.googleButton}
                          color="danger"
                          fullWidth
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          startIcon={<icon/>}
                          variant="outlined">Login with Google</Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justify="flex-end">
                <Grid item>
                   <Button onClick={SwitchMode}>
                       {isSignup ? 'Already have an account ? Sign In' : "Don't have an account? Sign Up"}
                   </Button>
                </Grid>  
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth