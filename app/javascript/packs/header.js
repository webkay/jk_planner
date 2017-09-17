import React from 'react'
import PropTypes from 'prop-types'

import GuestInputForm from './guest-input-form'

const Header = props => {
  return (
    <header>
      <h1>RSVP</h1>
      <p>A Treehouse App</p>
      <GuestInputForm
        handleNameInput={props.handleNameInput}
        newGuestSubmitHandler={props.newGuestSubmitHandler}
        pendingGuest={props.pendingGuest} />
    </header>
  );
}

Header.propTypes = {
  handleNameInput: PropTypes.func.isRequired,
  newGuestSubmitHandler: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired
}

export default Header
