require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./db')
const app = express()


app.use(cors())
app.use(express.json())
app.use(morgan('dev'))



const port = process.env.PORT

//GET ALL RESTAURANTS
app.get('/api/v1/restaurants', async (req,res) => {
    try {
        const {rows} = await db.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*),TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id')
        res.json({
            status: 'success',
            results: rows.length,
            data:{
                restaurants: rows
            }
        })
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

//GET SINGLE RESTAURANT
app.get('/api/v1/restaurants/:id',async(req,res) => {
    try {
        const restaurant = await db.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*),TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1',[req.params.id])
        const reviews = await db.query('SELECT * FROM reviews WHERE restaurant_id = $1',[req.params.id])
        console.log(restaurant)
        res.json({
            status:'success',
            data:{
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
           
        })

        
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

//CREATE RESTAURANT
app.post('/api/v1/restaurants',async (req,res) => {
    try {
        const {name,location,price_range} = req.body
        const {rows} =  await db.query('INSERT INTO restaurants(name,location,price_range) VALUES ($1,$2,$3) returning *',
        [name,location,price_range]
        )

        res.status(201).json({
            status:'success',
            data:{
                restaurant: rows[0]
            }
        })
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

//update restaurant
app.put('/api/v1/restaurants/:id',async(req,res) => {
    try {
        const {name,location,price_range} = req.body
        const {rows} = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',[name,location,price_range,req.params.id])

        res.status(200).json({
            status:'success',
            data: {
                restaurant: rows[0]
            }
        })
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

//DELETE RESTAURANT
app.delete('/api/v1/restaurants/:id',async(req,res) => {
    try {
        const {rows} = await db.query('DELETE FROM restaurants WHERE id = $1',[req.params.id])

        res.status(204).json({
            status:"success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


app.post('/api/v1/restaurants/:id/addReview',async (req,res) => {
    try {
        const {name,review,rating} = req.body
        const {rows} = await db.query('INSERT INTO reviews(restaurant_id,name,review,rating) VALUES ($1,$2,$3,$4)',[req.params.id,name,review,rating])

        res.status(201).json({
            status:'success',
            data:{
                review: rows[0]
            }
        })

    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

app.listen(port,() => {
    console.log(`its working on port: ${port}`)
})