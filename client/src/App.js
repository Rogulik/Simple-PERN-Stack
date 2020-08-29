import React from 'react' 
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import RestaurantDetailedPage from './routes/RestaurantDetailedPage'
import UpdateRestaurantPage from './routes/UpdateRestaurantPage'
import Home from './routes/Home'
import { RestaurantsContextProvider } from './context/RestaurantsContext'


const App = () => {
    return (
        <RestaurantsContextProvider>
        <div className='container'>
           <Router>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/restaurants/:id/update' component={UpdateRestaurantPage}/>
                    <Route exact path='/restaurants/:id' component={RestaurantDetailedPage}/>
                </Switch>
           </Router>
        </div>
    </RestaurantsContextProvider>
    )
}

export default App
