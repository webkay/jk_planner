// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var PLAYERS = [
];
var nextId = 0;

var Stopwatch = createReactClass({
  getInitialState: function() {
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0
    }
  },
  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 100);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  onTick: function() {
    if (this.state.running) {
      var now = Date.now()
      this.setState({
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
        previousTime: now
      });
    }
    // console.log('onTick')
  },
  onStart: function() {
    this.setState({ running: true, previousTime: Date.now() })
  },
  onStop: function() {
    this.setState({ running: false })
  },
  onReset: function() {
    this.setState({ elapsedTime: 0, previousTime: Date.now()})
  },
  render: function() {
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        { this.state.running ? <button onClick={this.onStop}>Stop</button> : <button onClick={this.onStart}>Start</button> }
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
});

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
      <Stopwatch />
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
  componentDidMount: function() {
    var request = new Request('http://localhost:3001/players', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    fetch(request).then(function(response){
      return response.json();
    }).then(function(players){
      this.setState({
        players: players
      });
    }.bind(this)).catch(function(error){
      console.error(error);
    });
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
    var request = new Request('http://localhost:3001/players', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        player_name: name,
        player_id: nextId,
      })
    });
    fetch(request).then(function(response){
      return response
    });
  },
  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
    var request = new Request("http://localhost:3001/players/" + this.state.players[index].id, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    fetch(request).then(function(response){
      return response
    });
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