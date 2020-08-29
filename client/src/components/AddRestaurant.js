import React, { useState, useContext } from 'react'
import restaurantFinder from '../apis/restaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

const AddRestaurant = () => {
  const [name,setName] = useState("")
  const [location,setLocation] = useState("")
  const [priceRange,setPriceRange] = useState("")
  const { addRestaurant } = useContext(RestaurantsContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
       const {data} = await restaurantFinder.post('/', {
            name,
            location,
            price_range: Number(priceRange)
        })
        addRestaurant(data.data.restaurant)
        setName("")
        setLocation("")
        setPriceRange("")
    } catch (error) {
        
    }

  }
    return (
        <div className='mb-4'>
            <form>
                <div className="form-row">
                    <div className="col">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="name"
                            value={name}
                            onChange={ e => setName(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="location" value={location} onChange={ e => setLocation(e.target.value)}/>
                    </div>
                    <div className="col">
                        <select className="custom-select  mr-sm-2" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                            <option value="disabled">Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
