import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { removeAppointmentThunk } from '../store'
import { getTimeStart } from '../utils'

const Events = (props) => {
    let { day, events, deleteAppointment, modal } = props
    events = events.filter(event => day[0] == event.day && day[1] == event.year && day[2] == event.month )
    events = events.sort((a, b) => getTimeStart(a) - getTimeStart(b))
    return (
        <div className='event'>
            {events.length ? events.map((event, key) => {
                return <div className='event-content' key={key}>
                    <span className='event-time' data-day={day}>{event.time}</span>
                    <div className='event-description' data-day={day} >{event.description}
                        {props.from && <button type='delete' onClick={() => deleteEvent(event.id)} >x
                    </button>}
                    </div>
                </div>
            }) :
                null
            }
        </div>
    )
}

const mapState = (state) => {
    return {
        events: state.calendar.events,
        modal: state.calendar.modal,
    }
}
const mapDispatch = (dispatch) => {
    return {
        deleteEvent(id) {
            dispatch(removeEventThunk(id))
        }
    }
}

export default connect(mapState, mapDispatch)(Events)