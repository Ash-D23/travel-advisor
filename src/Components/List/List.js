import React from 'react';
import { CircularProgress } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import './List.css'

function List({ type, hotels, restuarants,attractions, onplaceselect, refprops, isloading, places }) {

    return !isloading ? (
            places ? (places.map((item,i)=>{
                return (
                    <div ref={refprops[i]}>
                        <PlaceDetails type={type} hotels={hotels} restuarants={restuarants} attractions={attractions} onplaceselect={onplaceselect} item={item} />
                    </div>
                )
            })): (null)
           ) : (<div className="center">
           <CircularProgress size="5rem" />
         </div>)
        
}

export default List
