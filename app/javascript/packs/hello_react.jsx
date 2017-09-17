import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const GuestName = props => {
  if (props.isEditing) {
    return (
      <input type="text" value={props.children} onChange={props.handleNameEdits} />
    );
  }
  return <span>{props.children}</span>;
}

GuestName.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  handleNameEdits: PropTypes.func.isRequired
}

const Guest = props => {
    return (
          <li className="responded">
            <GuestName isEditing={props.isEditing} handleNameEdits={e => props.setName(e.target.value)}>{props.name}</GuestName>
            <label>
              <input
                type="checkbox"
                checked={props.isConfirmed}
                onChange={props.handleConfirmation} /> Confirmed
            </label>
            <button onClick={props.handleToggleEditing}>
              {props.isEditing ? 'save' : 'edit'}
            </button>
            <button onClick={props.handleRemove}>remove</button>
          </li>
    );
  }

Guest.propTypes = {
  name: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handleToggleEditing: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

const GuestList = props => {
    return (
        <ul>
          {props.guests
            .filter((guest) => { return (!props.isFiltered || guest.isConfirmed) })
            .map((guest, index) =>
            <Guest
              key={index}
              name={guest.name}
              isConfirmed={guest.isConfirmed}
              isEditing={guest.isEditing}
              handleConfirmation={() => props.toggleConfirmationAt(index)}
              handleToggleEditing={() => props.toggleEditingAt(index)}
              setName={text => props.setNameAt(text, index)}
              handleRemove={() => props.removeGuestAt(index)} />
          )}
        </ul>
    );
  }

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  removeGuestAt: PropTypes.func.isRequired
}

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
          }
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
  // getAttendingGuests = () =>
  // getUnconfirmedGuests = () =>

  render() {
    return (
    <div className="App">
      <header>
        <h1>RSVP</h1>
        <p>A Treehouse App</p>
        <form onSubmit={this.newGuestSubmitHandler}>
            <input type="text" onChange={this.handleNameInput} value={this.state.pendingGuest} placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </header>
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input type="checkbox" onChange={this.toggleFilter} checked={this.state.isFiltered} /> Hide those who haven't responded
          </label>
        </div>
        <table className="counter">
          <tbody>
            <tr>
              <td>Attending:</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Unconfirmed:</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
        <GuestList
          guests={this.state.guests}
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          removeGuestAt={this.removeGuestAt}
          isFiltered={this.state.isFiltered} />
      </div>
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
