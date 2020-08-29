import React, { useState, createContext } from 'react'

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider =  props => {
    const [restaurants,setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState("")

    const addRestaurant = (restaurant) => {
        setRestaurants([...restaurants,restaurant])
    }

    const deleteRestaurant = (id) => {
        setRestaurants(restaurants.filter((restaurant) => {
           return restaurant.id !== id
        }))
    }

    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants,addRestaurant,deleteRestaurant,selectedRestaurant,setSelectedRestaurant }}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}