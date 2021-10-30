import React, {useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

function PlaceDetails({ deltype, index, handledelete, type, hotels, restuarants, attractions, onplaceselect, item, buttondisabled }) {
    const [buttonselect, setbuttonselect] = useState(false)
    const displayRating = (rating)=>{
        let fullnum = Number(rating)
        let num = parseInt(rating)
        let half = fullnum - num

        let result = [];
        for (let i=0; i<num; i++){
            result.push(<StarIcon style={{fill: "#FFD700"}} />)
        }
        if(half>0){
            result.push(<StarHalfIcon style={{fill: "#FFD700"}}/>)
        }
        return result
    }

    useEffect(() => {
        if(!buttondisabled){
            if(type == "hotels"){
                if(item.name in hotels){
                    setbuttonselect(true)
                }
            }else if(type=="restaurants"){
                if(item.name in restuarants){
                    setbuttonselect(true)
                }
            }else{
                if(item.name in attractions){
                    setbuttonselect(true)
                }
            }
        }
    }, [])
    return (
        <Card>
            <CardMedia
                style={{ height: 300 }}
                image={item.photo ? item.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={item.name}
            />
            <CardContent>
                <Typography variant="h5">{item.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Typography component="legend">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {item.price}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography gutterBottom variant="subtitle1">
                        {item.ranking}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography component="legend">Rating</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {displayRating(item.rating) }    
                    </Typography>
                </Box>
                {
                  buttondisabled ? (<Button onClick={() => handledelete(index, deltype, item.name)} variant="contained" color="secondary"> Delete </Button>) : (
                    <Button onClick={()=> { setbuttonselect(!buttonselect); onplaceselect(item)}} variant="contained" color={buttonselect ? "primary" : "secondary"}>
                        {buttonselect ? "Remove" : "Select"}
                    </Button>
                  )
                }
                
            </CardContent>
            
        </Card>
    )
}

export default PlaceDetails
