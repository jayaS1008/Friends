import React,{useState ,useEffect} from "react";
import { Container, AppBar, Typography, Grow, Grid, Link, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles'
import {useDispatch} from 'react-redux'
import { useHistory ,useLocation} from "react-router-dom";
import memories from './memories.png';
import decode from "jwt-decode";
const Navbar=()=>
{
  const classes=useStyles();
  const dispatch =useDispatch();
  const location =useLocation();
  const history=useHistory();
  

  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const logout =()=>{
     dispatch({type :'LOGOUT'});
     history.push("/auth");
     setUser(null);
  }
  useEffect(()=>{
     const token =user?.token;
      if(token){
        const decodedToken =decode(token);
        if(decodedToken.exp*1000 < new Date().getTime())
        {
          logout();
        }
      }

     setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])
   return(
     <div>
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div  className={classes.brandContainer}>
            <Typography className={classes.heading}  variant="h2" align="center"><Link href="/">Sasta Insta</Link></Typography>
            <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
          {
            user?(
               <div className={classes.profile}>
                  <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                    {user.result.name.charAt(0)}
                  </Avatar>
                  <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                  <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
               </div>
            ):
            (
              <div>
                <Button variant ="outlined" color="primary" ><Link href="/auth" color="white">Sign in</Link></Button>
              </div>
             
            )
          }
        </Toolbar>
      </AppBar>
     </div>
   )
}
export default Navbar;