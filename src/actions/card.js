import { 
    UNFOLD_ALL,
    FOLD_ALL,
    UNFOLD_ONE,
    FOLD_ONE,
    HIDE_WRONGED_GUESSED,
    GET_SHUFFLED_CARDS_LIST,
    PUSH_NEW_GUESS,
    POP_NEW_GUESS,
    CHECK_IF_GAME_OVER,
    MATCH,
    TIME_UP
 } from './types'

// UNFOLD_ALL_CARDS

export const unfold_all = () => {
    return { type:UNFOLD_ALL }
}

// FOLD_ALL_CARDS

export const fold_all = () => {
    return { type:FOLD_ALL }
}

// UN_FOLD_ONE
export const unfold_single = (card_id) => {
    return { type:UNFOLD_ONE,payload:{card_id} }
}
// FOLD_ONE

export const fold_single = (card_id) => {
    return { type:FOLD_ONE,payload:{card_id} }
}

// PUSH_NEW_GUESS

export const push_new_guess = ({name}) => {
    return { type:PUSH_NEW_GUESS,payload:{card:name }}
}

// POP_NEW_GUESS

export const pop_new_guess = () => {
    return { type:POP_NEW_GUESS}
}


// MATCH_GUESSES

export const match = ({name}) => {
    return { type:MATCH ,payload:{card:name}}
}


// SHUFFLE

export const shuffle = (card_id) => {
    return { type:GET_SHUFFLED_CARDS_LIST }
}


// HIDE_WITH_NAME

export const hide_wrong_guessed = () => {
    return {
        type:HIDE_WRONGED_GUESSED,
    }
}

// Check if game is over

export const game_over_check = () => {
    return {
        type:CHECK_IF_GAME_OVER
    }
}

// Time Up
export const time_up = () => {
    return {
        type:TIME_UP
    }
}