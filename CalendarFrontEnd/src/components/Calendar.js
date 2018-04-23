import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import SingleDay from './SingleDay'
import Events from './Events';
import {getPresentDate, getMonth, getYear, shiftModal, getEventsThunk} from '../store'
import {handleNav, handleDaysPerMonth} from '../utils'

/**
 * COMPONENT
 */
class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkDate: '',
      start: '',
      days: [],
      daysPerMonths: [31,28,31,30,31,30,31,31,30,31,30,31],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ] ,
    }
    this.openModal = this.openModal.bind(this)
    this.handleNav = handleNav.bind(this)
    this.handleDaysPerMonth = handleDaysPerMonth.bind(this)
  }
  componentDidMount() {
    let presentDate = new Date
    let presentDateString = presentDate.toString();
    presentDateString = presentDateString.slice(0, presentDateString.indexOf(':') - 2)
    this.props.setPresentDate(presentDateString)
    
   
    let checkDate = new Date(`${presentDate.getFullYear()}, ${presentDate.getMonth() + 1}, 1`)
    let year = checkDate.getFullYear()
    let month = checkDate.getMonth()
    let start = checkDate.getDay();    
    
    this.props.handleMonth(month+1)
    this.props.handleYear(year)
    this.props.handleEvents(year, month+1)
    
    //create a day array that holds the correct days for the calendars 5 rows 7 days and setState on it
    this.handleDaysPerMonth(year, month+1)
  }

    //making a popup modal
  openModal(event) {
    if(!this.props.modal){
    const day = event.target.dataset.day
    let modal = document.getElementById(`modal${day}`)
    modal.style.display = 'flex'
    modal.style.flexDirection = 'column' 
    modal.style.justifyContent = 'space-between'
    this.props.openModal()
  }
  }


  

  render() {
    return (
      <div>
        <div className="month">
          <ul className='monthContent'>
            <li className="prev" onClick = {this.handleNav}>&#10094;</li>
            <h1 className='calendarHead'>
              {`${this.state.months[this.props.month-1]} ${this.props.year}`}
            </h1>
            <li className="next" onClick = {this.handleNav}>&#10095;</li>
          </ul>
        </div>

        <ul className="weekdays">
          <li>Sunday</li>
          <li>Monday</li>
          <li>Tuesday</li>
          <li>Wednesday</li>
          <li>Thursday</li>
          <li>Friday</li>
          <li>Saturday</li>
        </ul>

        <ul className="days">
          {this.state.days.length === 35 && this.state.days.map((day, key) => {
            return (<div key={key}
              data-day={day}
              onClick={this.openModal}
              className={`daysEntry ${day[3]}` + (day[0] == this.props.presentDate.slice(8,10)? ' current-day' : '')}>
              <li data-day={day} >{day[0]}</li>
              <Events day = {day} />
              <SingleDay day={day}/>
            </div>)
          })}
        </ul>
      </div>
    )
  }
}





/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    month: state.calendar.month,
    year: state.calendar.year,
    presentDate: state.calendar.presentDate,
    modal: state.calendar.modal,
    events: state.calendar.events
  }
}
const mapDispatch = (dispatch)=>{
  return{
    handleMonth(month){
      dispatch(getMonth(month))
    },
    handleYear(year){
      dispatch(getYear(year))
    },
    setPresentDate(presentDate){
      dispatch(getPresentDate(presentDate))
    },
    openModal(){
      dispatch(shiftModal())
    },
    handleEvents(year, month){
      dispatch(getEventsThunk(year, month))
    }
  }
}
export default connect(mapState, mapDispatch)(Calendar)