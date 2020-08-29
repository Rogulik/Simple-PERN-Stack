import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import restaurantFinder from '../apis/restaurantFinder'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'
import StarRating from '../components/StarRating'

const RestaurantDetailedPage = () => {
  const {id} = useParams()
  const {selectedRestaurant,setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const {data} = await restaurantFinder.get(`/${id}`)
                setSelectedRestaurant(data.data)
            } catch (error) {
                
            }
        }
        fetchRestaurant()
    },[])
    return (
        <div>
            {selectedRestaurant && (
                <> 
                    <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
                    <div className='text-center'>
                        <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
                        <span className="text-warning ml-1">
                            {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : '(0)'}
                        </span>
                    </div>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews}/> 
                        
                    </div>
                    <AddReview />
                </> 
            )}
        </div>
    )
}

export default RestaurantDetailedPage
