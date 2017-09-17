import React from 'react'
import PropTypes from 'prop-types'

import GuestList from './guest-list'
import Counter from './counter'
import ConfirmedFilter from './confirmed-filter'

const MainContent = props => {
  return (
    <div className="main">
      <div>
        <h2>Invitees</h2>
        <ConfirmedFilter
          toggleFilter={props.toggleFilter}
          isFiltered={props.isFiltered} />
      </div>
      <Counter
        numberAttending={props.numberAttending}
        numberUnconfirmed={props.numberUnconfirmed}
        totalInvited={props.totalInvited} />
      <GuestList
        guests={props.guests}
        toggleConfirmationAt={props.toggleConfirmationAt}
        toggleEditingAt={props.toggleEditingAt}
        setNameAt={props.setNameAt}
        removeGuestAt={props.removeGuestAt}
        isFiltered={props.isFiltered}
        pendingGuest={props.pendingGuest} />
    </div>
  )
}

MainContent.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  numberAttending: PropTypes.number.isRequired,
  numberUnconfirmed: PropTypes.number.isRequired,
  totalInvited: PropTypes.number.isRequired,
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  removeGuestAt: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired
}

export default MainContent
