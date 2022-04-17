import React from 'react';
import { TextField , Grid ,InputAdornment } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const Input = ({name ,handleChange ,label, half ,autoFocus ,type ,handleShowPassword}) => {
  return (
    <div>
   <Grid item xs={12} sm={half? 6:12}>
          <TextField fullWidth
              name={name}
              onChange={handleChange}
              variant="outlined"
              required 
              label={label}
              autoFocus={autoFocus}
              type={type}
              size="lg"
              margin="dense"
              InputProps={ name ==='password' ? {
                  endAdornment:(
                      <InputAdornment position="end">
                          <IconButton onClick= {handleShowPassword} >
                              {type === "password" ? <Visibility/> : <VisibilityOff/>}
                          </IconButton>
                      </InputAdornment>
                  )
              }:null}/>
        </Grid>
    </div>
  )
}

export default Input