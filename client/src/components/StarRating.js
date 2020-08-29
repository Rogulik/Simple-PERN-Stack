import React from 'react'

const StarRating = ({rating}) => {
    //container for start
    const stars = []
    //iterate through available amount of stars
    for(let i = 1;i <= 5;i++){
        //if i is less or equal the reting amount add full star
        if(i <= rating){
            stars.push(<i key={i} className="fas fa-star text-warning"></i>)
        } else if(i === Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<i key={i} className='fas fa-star-half-alt text-warning'></i>)
        }
        else {
            stars.push(<i key={i} className="far fa-star text-warning"></i>)
        }
    }
    return (
       <>
        {stars}
       </>
    )
}

export default StarRating
