// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var PLAYERS = [
  {name: "Jimmy Johns", score: 31, id: 1},
  {name: "Jackie Robinson", score: 33, id: 2},
  {name: "Ed Kesson", score: 42, id: 3}
];
var nextId = 4;

var AddPlayerForm = createReactClass({
  propTypes: {
    onAdd: PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      name: "",
    }
  },
  onNameChange: function(e) {
    // console.log('onNameChange', e.target.value);
    this.setState({name: e.target.value});
  },
  onSubmit: function(e) {
    e.preventDefault();

    this.props.onAdd(this.state.name);
    this.setState({name: ""})
  },
  render: function () {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange} />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
});

function Stats(props) {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);
  return(
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
}

Stats.propTypes = {
  players: PropTypes.array.isRequired
}

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired
}

function Counter (props) {
  return (
    <div className="counter">
      <button className="counter-action decrement"
        onClick={function() { props.onChange(-1);}}> - </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment"
        onClick={function() { props.onChange(1);}}> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>✖︎</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
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
  onScoreChange: function(index, delta) {
    // console.log('onScoreChange', index, delta);
    this.state.players[index].score += delta;
    this.setState(this.state);
  },
  onPlayerAdd: function(name) {
    // console.log('onPlayerAdd', name);
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    })
    this.setState(this.state);
    nextId += 1;
  },
  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />
        <div>
          {this.state.players.map(function (player, index) {
            return (<Player name={player.name} score={player.score} key={player.id}
              onScoreChange={function(delta) { this.onScoreChange(index, delta)}.bind(this)}
              onRemove={function() {this.onRemovePlayer(index)}.bind(this)} />);
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd} />
      </div>
    );
  }
})

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello initialPlayers={PLAYERS} />,
    document.body.appendChild(document.createElement('div')),
  )
})
