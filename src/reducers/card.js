import * as actionCreator from '../actions/types'
import randomize_cards from '../random_pair'
import { cards_each_row,groups_to_match } from '../config/config'
import uuid from 'uuid/v1'
const gameState = {
    game_id:uuid(),
    cards:[],
    correct:[],
    guesses:[],
    to_be_guessed:[],
    wrong_guess:false,
    game_over:false,
    score_board:{
        wrong_guesses:0,
        correct_guesses:0
    },
    should_timer_start:false
}


const fold_class =  ['flip-card']
const unfold_class = ['flip-card','rotate-flip-card']










export const cardReducer = (state=gameState,action) => {
    
    
    switch(action.type)
    {   
        case actionCreator.CHECK_IF_GAME_OVER:
            if(state.correct.length >= 13)
            {                
                save_to_browser({game_id:state.game_id,...state.score_board,date:getTodayDate()})
                return {
                    ...state,
                    game_over:true
                }        
            }
            return state
            case actionCreator.TIME_UP:
                save_to_browser({game_id:state.game_id,...state.score_board,date:getTodayDate()})
                return {
                    ...state,
                    game_over:true
                }
                
                
                case actionCreator.FOLD_ALL:
                    
                    return {...state,cards:[...state.cards.map(card => ({...card,is_fliped:false,is_disabled:false}))],should_timer_start:true}
                    
                    
                    case actionCreator.UNFOLD_ALL:
                        return {...state,cards:[...state.cards.map(card => ({...card,is_fliped:true}))]}
                        
                        case actionCreator.HIDE_WRONGED_GUESSED:            
                        return {
                            ...state,
                            wrong_guess:false,
                            cards:[
                                ...state.cards.map(card => {
                                    if(state.guesses.includes(card.name)) {
                                        return {...card,is_fliped:false}
                            }
                            return card
                        })],
                        guesses:[]
                    }
                    case actionCreator.UNFOLD_ONE:             

                    return {
                        ...state,
                cards:[
                    ...state.cards.map((card,index) => {
                            if(card.id == action.payload.card_id)
                            {
                                return {...card,is_fliped:false}
                            }     
                            return card
                        })
                        
                    ]
                }
                
        case actionCreator.FOLD_ONE:
            
            return {
                ...state,
                cards:[             
                    ...state.cards.map((card,index) => {
                        if(card.id == action.payload.card_id)
                        {
                            return {...card,is_fliped:true}
                        }
                        return card
                    })               
                ]            
            }
            
        case actionCreator.GET_SHUFFLED_CARDS_LIST:
            let randomizer = randomize_cards(cards_each_row,groups_to_match)
            return {
                ...state,
                cards:[...randomizer.shuffle],
                to_be_guessed:[...randomizer.sample]
            }
            
            case actionCreator.PUSH_NEW_GUESS:
            return {
                ...state,
                guesses:[
                    ...state.guesses,action.payload.card
                ]
            }
            case actionCreator.POP_NEW_GUESS:
                return {
                    ...state,
                guesses:[
                    ...state.guesses.slice(0,state.guesses.length - 1)
                ]
            }
            case actionCreator.MATCH:
                if( !(match(state.guesses,action.payload.card))){
                    return {
                        ...state,
                        wrong_guess:true,
                        score_board:{
                            ...state.score_board,
                            wrong_guesses:state.score_board.wrong_guesses + 1
                        }
                    }
            }else {
                let correcttly_guessed_card = state.guesses.filter((v,i,a) => a.indexOf(v) == i)[0]
                return {
                    ...state,                 
                    correct:[...state.correct,correcttly_guessed_card],
                    to_be_guessed:[
                        ...state.to_be_guessed.filter(card => {
                            return correcttly_guessed_card !== `card-${card}`                            
                        })
                    ],
                    cards:[...state.cards.map(card => {
                        if(state.guesses.includes(card.name)){
                            card.is_disabled = true
                            return card
                        }   
                        return card

                    })],
                    guesses:[],
                    score_board:{
                        ...state.score_board,
                        correct_guesses:state.correct.guesses + 1
                    }
    
                }
            }
            default:
                return state
    }
}




const match = (state_guesses,current_card) => {
    let isMatch = true
    
    for(var i=0;i<4;i++){
        if(state_guesses[i] !== current_card){
            isMatch = false
            break
        }
    }
    
    return isMatch
}


const save_to_browser = (score_board) => {
    var lStorage = localStorage.getItem('flip-card-game-storage')
    if(!lStorage || lStorage.length <= 0){
        localStorage.setItem('flip-card-game-storage',JSON.stringify([{...score_board}]))
    }
    else {
        lStorage = JSON.parse(lStorage)
        lStorage.push({...score_board})
        localStorage.setItem('flip-card-game-storage',JSON.stringify(lStorage))
    }
    
}

const getTodayDate = () => {
    var today = new Date()
    var date = today.getDate()
    var month = today.getMonth() + 1
    var yyyy = today.getFullYear()
    
    today = `${date} / ${month} / ${yyyy}` 
    return today
}