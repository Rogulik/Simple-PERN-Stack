import React, { useState, useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import restaurantFinder from '../apis/restaurantFinder'

const UpdateRestaurant = (props) => {
    const {id} = useParams()
    const {restaurants} = useContext(RestaurantsContext)
    let history = useHistory()
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")

    useEffect(() => {
        const fetchRestaurant = async () => {
          const {data} = await restaurantFinder.get(`/${id}`)
          setName(data.data.restaurant.name)
          setLocation(data.data.restaurant.location)
          setPriceRange(data.data.restaurant.price_range)
        }
        fetchRestaurant()
    },[])

    const onUpdateEvent = async (e) => {
        e.preventDefault()
       const data = await restaurantFinder.put(`/${id}`,{
           name,
           location,
           price_range: priceRange
       })
       
       history.push('/')
    }
    return (
        <div className='container'>
            <form action="">
                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input type="text" id='name' value={name} onChange={e => setName(e.target.value)} className='form-control'/>
                </div>
                <div className="form-group">
                    <label htmlFor='location'>Location</label>
                    <input type="text" id='location' value={location} className='form-control'onChange={e => setLocation(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor='price_range'>Price Range</label>
                    <input type="number" id='price_range' value={priceRange} className='form-control'onChange={e => setPriceRange(e.target.value)}/>
                </div>
                <button type='submit' onClick={onUpdateEvent} className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant
