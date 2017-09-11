// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

function Counter (props) {
  return (
    <div className="counter">
      <button className="counter-action decrement"> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment"> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: PropTypes.number.isRequired
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">{props.name}</div>
      <div className="player-score">
        <Counter score={props.score} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
}

var Hello = createReactClass({
  propTypes: {
    title: PropTypes.string
  },
  getDefaultProps: function() {
    return {
      title: 'Scoreboard'
    };
  },
  getInitialState: function() {
    return {
      players: this.props.initialPlayers
    };
  },
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} />
        <div>
          {this.state.players.map(function (player) {
            return <Player name={player.name} score={player.score} key={player.id} />
          })}
        </div>
      </div>
    );
  }
})

var PLAYERS = [
  {name: "Jimmy Johns", score: 31, id: 1},
  {name: "Jackie Robinson", score: 33, id: 2},
  {name: "Ed Kesson", score: 42, id: 3}
];

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello initialPlayers={PLAYERS} />,
    document.body.appendChild(document.createElement('div')),
  )
})
