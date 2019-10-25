import { cardReducer } from './card'
import { combineReducers }  from 'redux'


export default combineReducers({
    game:cardReducer
})
 
 