import React from 'react';
import { Button, Typography } from '@material-ui/core';
import './searchcity.css'

function SearchCity({setcity}) {
    const searchcity = ()=>{
        setcity(true)
    }
    return (
        <div className="main">
            <Typography variant="h4" color="primary"> Welcome to Travel Advisor</Typography>
            <Typography gutterBottom variant="subtitle1">Plan your Travel Itenary Today </Typography>
            <Button onClick={searchcity} variant="contained" color="primary" >Search</Button>
            <Typography variant="h5"> Search Hotels, Restuarants & Attractions Near You </Typography>
            
        </div>
    )
}

export default SearchCity
