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

var Counter = createReactClass({
  propTypes: {
    initialScore: PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      score: this.props.initialScore
    }
  },
  incrementScore: function(e) {
    this.setState({
      score: this.state.score + 1
    });
  },
  decrementScore: function(e) {
    this.setState({
      score: this.state.score - 1
    });
  },
  render: function() {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
        <div className="counter-score"> {this.state.score} </div>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
    );
  }
});

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">{props.name}</div>
      <div className="player-score">
        <Counter initialScore={props.score} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
}

function Hello(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
      <div>
        {props.players.map(function (player) {
          return <Player name={player.name} score={player.score} key={player.id} />
        })}
      </div>
    </div>
  );
}

Hello.defaultProps = {
  title: 'Scoreboard'
}

Hello.propTypes = {
  title: PropTypes.string
}

var PLAYERS = [
  {name: "Jimmy Johns", score: 31, id: 1},
  {name: "Jackie Robinson", score: 33, id: 2},
  {name: "Ed Kesson", score: 42, id: 3}
];

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello players={PLAYERS} />,
    document.body.appendChild(document.createElement('div')),
  )
})
