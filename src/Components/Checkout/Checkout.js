import React, {useState, useEffect } from 'react';
import './Checkout.css'
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import { Button } from '@material-ui/core';

function Checkout({ onplaceselect, type, hotels, restuarants, attractions, goback}) {
    const [newhotels, setnewhotels] = useState([])
    const [newrestuarants, setnewrestuarants] = useState([])
    const [newattractions, setnewattractions] = useState([])
    const [refresh, setrefresh] = useState(false)
    

    const handledelete = (index, deltype, name) => {
        console.log(deltype)
        if (deltype == "hotels"){
            let arr = newhotels
            
            if(name in hotels){
                delete hotels[name]
            }

            arr.splice(index,1)
            setnewhotels(arr)
        } else if (deltype == "restaurants"){
            
            let arr = newrestuarants
            if(name in restuarants){
                delete restuarants[name]
            }
            arr.splice(index,1)
            setnewrestuarants(arr)
        } else{
            let arr = newattractions
            if(name in attractions){
                delete attractions[name]
            }
            arr.splice(index,1)
            setnewattractions(arr)
        }
        setrefresh(!refresh)
    }

    useEffect(() => {
        setnewhotels(Object.entries(hotels))
        setnewrestuarants(Object.entries(restuarants))
        setnewattractions(Object.entries(attractions))
    }, [])
    console.log("rendered")
    return (
        <div className="checkout-container">
            <div>
                <h2 className="checkout-title">Hotels</h2>
                <div className="checkout-items">
                {
                   newhotels.length != 0 ?  newhotels.map((item, index)=> (
                        <div className="checkout-item">
                        <PlaceDetails deltype="hotels" index={index} handledelete={handledelete} onplaceselect={onplaceselect} type={type} hotels={hotels} restuarants={restuarants} attractions={attractions} item={item[1]} buttondisabled={true} />
                        </div>
                    )) : (<p className="noitems">No Hotels Selected</p>)
                }
                </div>
                
            </div>
            <div>
                <h2 className="checkout-title">Restuarants</h2>
                <div className="checkout-items">
                {
                    newrestuarants.length !=0 ? newrestuarants.map((item, index)=> (
                        <div className="checkout-item">
                        <PlaceDetails deltype="restaurants" index={index} handledelete={handledelete} onplaceselect={onplaceselect} type={type} hotels={hotels} restuarants={restuarants} attractions={attractions} item={item[1]} buttondisabled={true} />
                        </div>
                    )) : (<p className="noitems">No Restuarants Selected</p>)
                }
                </div>
                
            </div>
            <div>
                <h2 className="checkout-title">Attractions</h2>
                <div className="checkout-items">
                {
                    newattractions.length !=0 ? newattractions.map((item, index)=> (
                        <div className="checkout-item">
                        <PlaceDetails deltype="attractions" index={index} handledelete={handledelete} onplaceselect={onplaceselect}  type={type} hotels={hotels} restuarants={restuarants} attractions={attractions} item={item[1]} buttondisabled={true} />
                        </div>
                    )) : (<p className="noitems">No Attractions Selected</p>)
                }
                </div>
                
            </div>
            <div className="checkout-items check-btn">
                <Button onClick = {goback} variant="contained" color="primary" >Go Back</Button>
            </div>
           
        </div>
    )
}

export default Checkout
