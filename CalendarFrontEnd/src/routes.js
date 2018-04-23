import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

import {Calendar} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {

  render () {

    return (
      <Switch>
        <Route component={Calendar} />
      </Switch>
    )
  }
}



// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter((Routes))