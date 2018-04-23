import axios from 'axios'


/**
* ACTION TYPES
*/
const GET_PRESENT_DATE = 'GET_PRESENT_DATE'
const GET_MONTH = 'GET_MONTH'
const GET_YEAR = 'GET_YEAR'
const GET_EVENTS = 'GET_EVENTS'

const ADD_EVENTS = 'ADD_EVENTS'
const SHIFT_MODAL = 'SHIFT_MODAL'
const REMOVE_EVENT = 'REMOVE_EVENT'


/**
* INITIAL STATE
*/
const calendar = {
    presentDate: '',
    year: '',
    month: '',
    modal: false,
    events: []
}

/**
* ACTION CREATORS
*/

export const getPresentDate = (presentDate) => ({ type: GET_PRESENT_DATE, presentDate })
export const getMonth = (month) => ({ type: GET_MONTH, month })
export const getYear = (year) => ({ type: GET_YEAR, year })
export const shiftModal = () => ({ type: SHIFT_MODAL })
export const getEvents = (events) => ({ type: GET_EVENTS, events })
export const addEvents = (event) => ({ type: ADD_EVENTS, event })
export const removeEvent = (id) => ({ type: REMOVE_EVENT, id })

/**
* THUNK CREATORS
*/

export const getEventsThunk = (year, month) =>
    dispatch =>
        axios.get(`/api/events/${year}-${month}`)
            .then(events => dispatch(getEvents(events.data)))
            .catch(err => console.log(err))

export const addEventThunk = (body) =>
    dispatch =>
        axios.post('/api/events', body)
            .then((event) => dispatch(addEvents(event.data)))
            .catch(err => console.log(err))

export const removeEventThunk = (id) =>
    dispatch =>
        axios.delete(`/api/events/${id}`)
            .then(() => dispatch(removeEvent(id)))
            .then(() => console.log('done'))
            .catch(err => console.log(err))


/**
* REDUCER
*/
export default function (state = calendar, action) {
    switch (action.type) {
        case GET_PRESENT_DATE:
            return Object.assign({}, state, { presentDate: action.presentDate })
        case GET_MONTH:
            return Object.assign({}, state, { month: action.month })
        case GET_YEAR:
            return Object.assign({}, state, { year: action.year })
        case SHIFT_MODAL:
            return Object.assign({}, state, { modal: !state.modal })
        case GET_EVENTS:
            return Object.assign({}, state, { events: action.events })
        case ADD_EVENTS:
            return Object.assign({}, state, { events: state.events.concat(action.event) })
        case REMOVE_EVENT:
            return Object.assign({}, state, { events: state.events.filter((event) => event.id != action.id) })
        default:
            return state
    }
}