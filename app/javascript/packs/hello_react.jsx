import React from 'react'
import ReactDOM from 'react-dom'

import Header from './header'
import MainContent from './main-content'

class Hello extends React.Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [
      {name: 'Iver', isConfirmed: false, isEditing: false},
      {name: 'Corrina', isConfirmed: true, isEditing: false},
      {name: 'Joel', isConfirmed: true, isEditing: true}
    ]
  }

  toggleGuestPropertyAt = (property, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });
  }

  toggleConfirmationAt = indexToChange => {
    this.toggleGuestPropertyAt('isConfirmed', indexToChange)
  }

  removeGuestAt = index => {
    this.setState({
      guests: [
        ...this.state.guests.slice(0, index),
        ...this.state.guests.slice(index + 1)
      ]
    })
  }

  toggleEditingAt = indexToChange => {
    this.toggleGuestPropertyAt('isEditing', indexToChange)
  }

  setNameAt = (name, indexToChange) => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index == indexToChange) {
          return {
            ...guest,
            name
          }
        }
        return guest;
      })
    })
  }

  toggleFilter = () => {
    this.setState({
      isFiltered: !this.state.isFiltered
    })
  }

  handleNameInput = e => {
    this.setState({
      pendingGuest: e.target.value
    });
  }

  newGuestSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ""
    })
  }

  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () => {
    return this.state.guests.reduce((total, guest) => {
      return guest.isConfirmed ? total + 1 : total
    }, 0);
  }

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
    <div className="App">
      <Header
        newGuestSubmitHandler={this.newGuestSubmitHandler}
        pendingGuest={this.state.pendingGuest}
        handleNameInput={this.handleNameInput}
      />
      <MainContent
        toggleFilter={this.toggleFilter}
        isFiltered={this.state.isFiltered}
        totalInvited={totalInvited}
        numberAttending={numberAttending}
        numberUnconfirmed={numberUnconfirmed}
        guests={this.state.guests}
        toggleConfirmationAt={this.toggleConfirmationAt}
        toggleEditingAt={this.toggleEditingAt}
        setNameAt={this.setNameAt}
        removeGuestAt={this.removeGuestAt}
        pendingGuest={this.state.pendingGuest}
      />
    </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
