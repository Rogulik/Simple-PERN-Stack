import React, { useState } from 'react'
import restaurantFinder from '../apis/restaurantFinder'
import { useParams, useLocation, useHistory } from 'react-router-dom'

const AddReview = () => {
    const {id} = useParams()
    const location = useLocation()
    let history = useHistory()
    const [name,setName] = useState("")
    const [reviewText,setReviewText] = useState("")
    const [rating,setRating] = useState("")
    
    const handleSubmitReview = async e => {
        e.preventDefault()
        try {
            await restaurantFinder.post(`/${id}/addReview`,{
                name,
                review: reviewText,
                rating,
            })
            history.push('/')
            history.push(location.pathname)

        } catch (error) {
            
        }
        

    }
    return (
        <div className='mb-2'>
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' placeholder='Name' className="form-control" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="form-group col-3">
                        <label htmlFor="rating">Rating</label>
                        <select id="" className="custom-select" value={rating} onChange={e => setRating(e.target.value)}>
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group ">
                    <label htmlFor="review">Review</label>
                    <textarea id="review" className='form-control' value={reviewText} onChange={e => setReviewText(e.target.value)}></textarea>
                </div>
                <button onClick={handleSubmitReview} className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddReview
