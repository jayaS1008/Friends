import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Navbar from './components/NavBar/Nav';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Sidebar from './components/Sidebar/Sidebar';
import{BrowserRouter , Switch , Route } from 'react-router-dom';
const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div>
    <BrowserRouter>
   
      <Container maxWidth="lg">
       <Navbar className={classes.appBar} position="static" color="inherit"/>
       <Switch>
         <Route path="/" exact component={Home}/>
         <Route path="/auth" exact component={Auth}/>
       </Switch>
      </Container>
    </BrowserRouter>
    
    </div>
  );
};

export default App;
