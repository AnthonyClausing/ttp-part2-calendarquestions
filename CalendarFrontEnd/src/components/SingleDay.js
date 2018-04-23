import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import Events from './Events'
import { shiftModal, addEventThunk, getEventsThunk } from '../store'
import { creatingTimeString } from '../utils'
const SingleDay = (props) => {

    function handleClose(event) {
        event.stopPropagation()
        let modal = document.getElementById(`modal${props.day}`)
        modal.style.display = 'none'
        props.changeModal()
        return;
    }


    return (
        <div className='modal' id={`modal${props.day}`}>
            <div className='modal-header'>
                <span className='modal-date'>{`${props.day[0]}/${props.day[2]}/${props.day[1]}`}</span>
                <span className='modal-close' onClick={handleClose.bind(this)}>X</span>
            </div>
            <form className='create-event' onSubmit={(event) => { props.handleAddEvent(event, props, handleClose); }}>
                <div className='create-event-time'>
                    <div>
                        <span>Start Time: </span>
                        <input name='startHour' type='number' max='12' min='1'></input>
                        <span>:</span>
                        <input name='startMin' type='number' max='60' min='0'></input>
                        <select name='start'>
                            <option value='AM'>AM</option>
                            <option value='PM'>PM</option>
                        </select>
                    </div>
                    <div>
                        <span>End Time: </span>
                        <input name='endHour' type='number' max='12' min='1'></input>
                        <span>:</span>
                        <input name='endMin' type='number' max='60' min='0'></input>
                        <select name='end'>
                            <option value='AM'>AM</option>
                            <option value='PM'>PM</option>
                        </select>
                    </div>
                </div>
                <span>Description </span>
                <textarea name='description' className="create-event-description" ></textarea>
                <button type='submit'>submit</button>
            </form>
            <Events day={props.day} from={true} />
        </div>
    )
}


const mapState = (state) => {
    return {
        modal: state.calendar.modal,
        year: state.calendar.year,
        month: state.calendar.month,
        events: state.calendar.events
    }
}

const mapDispatch = (dispatch) => {
    return {
        changeModal() {
            dispatch(shiftModal())
        },
        handleAddEvent(event, props, handleClose) {
            event.preventDefault()
            let { description, endHour, endMin, startHour, startMin ,start,end} = event.target

            if (!endMin.value || !endHour.value || !startHour.value || !startMin.value || !start.value || !end.value) return alert('Form was not completely filled out')
            if (start.value === 'PM' && end.value === 'AM') { return alert('start and end time are impossible') }
            else if (start.value === end.value) {
                if (parseInt(startHour.value) % 12 > parseInt(endHour.value) % 12) { return alert('Please input possible times') }
                else if (parseInt(startHour.value) === parseInt(endHour.value) && parseInt(startMin.value) > parseInt(endMin.value)) { return alert('Please input possible times') }
            }
            let time = creatingTimeString(startHour, startMin, start, endHour, endMin, end)
            let body = {
                year: props.day[1],
                month: props.day[2],
                day: props.day[0],
                description: description.value,
                time: time
            }
            handleClose(event)
            dispatch(addEventThunk(body))
            
        }
    }
}
  


export default connect(mapState,mapDispatch) (SingleDay)