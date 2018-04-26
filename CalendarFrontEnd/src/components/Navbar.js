import React from 'react'
import {connect} from 'react-redux'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div className = 'header'>
    <h1 className="title-name">Calendar</h1>
    </div>
    <hr />
  </div>
)


export default Navbar