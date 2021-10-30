import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css'
function Header({ setcity }) {
    return (
        <AppBar position="static">
          <Toolbar >
            <Typography onClick={() => setcity(false)} className="pointer" variant="h5" >
              Travel Advisor
            </Typography>
          </Toolbar>
        </AppBar>
    )
}

export default Header
