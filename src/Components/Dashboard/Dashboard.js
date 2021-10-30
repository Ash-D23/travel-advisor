import React, {useState, useEffect } from 'react';
import Map from '../Map/Map';
import List from '../List/List';
import { getPlacesData } from '../api.js';
import { InputLabel, MenuItem, FormControl, Select, Button, Typography } from '@material-ui/core';
import Checkout from '../Checkout/Checkout';
import './Dashboard.css';

const selectedhotels = {}

const selectedRestuarants = {}

const selectedAttractions = {}

function Dashboard() {

    const [coords, setCoords] = useState(null);
    const [bounds, setBounds] = useState(null);
    const [places, setPlaces] = useState([]);
    const [type, settype] = useState('hotels')
    const [rating, setRating] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [isloading, setloading] = useState(false)
    const [checkout, oncheckout] = useState(false)

    const [elRefs, setElRefs] = useState([]);

    const onplaceselect = (item)=>{
        if (type == "hotels"){
            if(item.name in selectedhotels){
                delete selectedhotels[item.name]
            }else{
                selectedhotels[item.name]=item
            }
            
        } else if (type == "restaurants"){
            if(item.name in selectedRestuarants){
                delete selectedRestuarants[item.name]
            }else{
                selectedRestuarants[item.name]=item
            }
        } else{
            if(item.name in selectedAttractions){
                delete selectedAttractions[item.name]
            }else{
                selectedAttractions[item.name]=item
            }
        }
    }

    const handlechildclick = (id)=>{

        elRefs[id].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
    }

    useEffect(()=>{
        console.log("called called")
        if (navigator.geolocation) {
            console.log("called")
            navigator.geolocation.getCurrentPosition((position)=>{
                setCoords({lat: position.coords.latitude, lng: position.coords.longitude})
            });
          }
    }, [])

    useEffect((refs)=>{
        
        setElRefs((refs) => Array(filteredPlaces.length).fill().map((_, i) => refs[i] || React.createRef()));
    },[filteredPlaces])

    useEffect(() => {
        if(places){
            const filtered = places.filter((place) => Number(place.rating) > rating);
    
            setFilteredPlaces(filtered);
        }
        
      }, [places, rating]);


    useEffect(()=>{
        if (bounds) {
          setPlaces(null)
          setloading(true)
          getPlacesData(bounds.sw, bounds.ne, type)
            .then((data) => {
              console.log(data)
              setPlaces(data)
              setloading(false)
            });
        }
        
      },[bounds, type])

    return checkout ? (<Checkout goback = {() => oncheckout(false)} onplaceselect={onplaceselect}  type={type} hotels={selectedhotels} restuarants={selectedRestuarants} attractions={selectedAttractions}   />) : (
        <div className='dash-container'>
            <div className='dash-list'>
                <Typography variant="h5" color="primary"> Select {type[0].toUpperCase() + type.slice(1)} Near You</Typography>
                <div className="check">
                    <FormControl >
                        <InputLabel id="type">Type</InputLabel>
                        <Select id="type" value={type} onChange={(e) => settype(e.target.value)}>
                        <MenuItem value="restaurants">Restaurants</MenuItem>
                        <MenuItem value="hotels">Hotels</MenuItem>
                        <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="rating">Rating</InputLabel>
                        <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="3">Above 3.0</MenuItem>
                        <MenuItem value="4">Above 4.0</MenuItem>
                        <MenuItem value="4.5">Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick = {() => oncheckout(true)} variant="contained" color="primary" >Checkout</Button>
                </div>

                <List type={type} hotels={selectedhotels} restuarants={selectedRestuarants} attractions={selectedAttractions} onplaceselect={onplaceselect} refprops={elRefs} isloading={isloading} places={filteredPlaces.length ? filteredPlaces : places} />
            </div>
            <div className='dash-map'>
                <Map 
                    setBounds={setBounds}
                    setCoords={setCoords}
                    coords={coords}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    handlechildclick={handlechildclick}
                />
            </div>
        </div>
    )
}

export default Dashboard
