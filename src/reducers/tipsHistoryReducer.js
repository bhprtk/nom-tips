import { createReducer } from 'reduxsauce'
import types from '../actions/types'

const INITIAL_STATE = Object.assign({}, null)

const getTipsHistoryFunc = (state = INITIAL_STATE, action) => {
    console.log('action', action)
    return state
}

const ACTION_HANDLERS = {
    [types.GET_TIPS_HISTORY]: getTipsHistoryFunc
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
