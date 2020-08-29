import React,{useEffect, useContext} from 'react'
import restaurantFinder from '../apis/restaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useHistory } from 'react-router-dom'
import StarRating from './StarRating'

const RestaurantList = (props) => {
    const { restaurants,setRestaurants,deleteRestaurant } = useContext(RestaurantsContext)
    let history = useHistory()
    useEffect( () => {
        const fetchData = async () => {
            try {
                const { data } =  await restaurantFinder.get("/")
                setRestaurants(data.data.restaurants)
            } catch (error) {
                
            }
        }

        fetchData()
       
    }, [])

    const handleDelete = async (e,id) => {
        e.stopPropagation()
        try {
            const result = await restaurantFinder.delete(`/${id}`)
            console.log(result)
            deleteRestaurant(id)
        } catch (error) {
            
        }
    }
    console.log(restaurants)

    const handleUpdate = (e,id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    }

    const handleSelect = (id) => {
        history.push(`/restaurants/${id}`)
    }

    const renderRating = (restaurant) => {
        if(!restaurant.count){
            return <span className='text-warning'>0 reviews</span>
        }
        return(
            <>
                <StarRating rating={restaurant.average_rating}/>
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        )  
    }

    return (
        <div className='list-group'>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map((restaurant) => {
                        return (
                        <tr key={restaurant.id} onClick ={() => handleSelect(restaurant.id)}>
                            <td>{ restaurant.name }</td>
                            <td>{ restaurant.location }</td>
                            <td>{ "$".repeat(restaurant.price_range) }</td>
                            <td>{renderRating(restaurant)}</td>
                            <td>
                                <button className="btn btn-warning" onClick={(e) => handleUpdate(e,restaurant.id)}>Update</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={(e) => handleDelete(e,restaurant.id)}>Delete</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
