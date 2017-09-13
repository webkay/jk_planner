// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Guest = props => {
    return (
          <li className="responded"><span>{props.name}</span>
            <label>
              <input
                type="checkbox"
                checked={props.isConfirmed}
                onChange={props.handleConfirmation} /> Confirmed
            </label>
            <button>edit</button>
            <button>remove</button>
          </li>
    );
  }

Guest.propTypes = {
  name: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired
}

const GuestList = props => {
    return (
        <ul>
          {props.guests.map((guest, index) =>
            <Guest
              key={index}
              name={guest.name}
              isConfirmed={guest.isConfirmed}
              handleConfirmation={() => props.toggleConfirmationAt(index)} />
          )}
        </ul>
    );
  }

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired
}

class Hello extends React.Component {

  state = {
    guests: [
      {name: 'Iver', isConfirmed: false},
      {name: 'Corrina', isConfirmed: true},
      {name: 'Joel', isConfirmed: true}
    ]
  }

  toggleConfirmationAt = indexToChange => {
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            isConfirmed: !guest.isConfirmed
          }
        }
        return guest;
      })
    });
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
        <form>
            <input type="text" value="Safia" placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </header>
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input type="checkbox" /> Hide those who haven't responded
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
          toggleConfirmationAt={this.toggleConfirmationAt} />
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
