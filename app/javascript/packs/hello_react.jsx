// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

function Hello() {
  return (
    <div className="scoreboard">
      <div className="header">
        <h1>Scoreboard</h1>
      </div>

      <div>
        <div className="player">
          <div className="player-name">Jimmy Johns</div>
          <div className="player-score">
            <div className="counter">
              <button className="counter-action decrement"> - </button>
              <div className="counter-score"> 42 </div>
              <button className="counter-action increment"> + </button>
            </div>
          </div>
        </div>
        <div className="player">
          <div className="player-name">Jackie Robinson</div>
          <div className="player-score">
            <div className="counter">
              <button className="counter-action decrement"> - </button>
              <div className="counter-score"> 42 </div>
              <button className="counter-action increment"> + </button>
            </div>
          </div>
        </div>
        <div className="player">
          <div className="player-name">Ed Kesson</div>
          <div className="player-score">
            <div className="counter">
              <button className="counter-action decrement"> - </button>
              <div className="counter-score"> 32 </div>
              <button className="counter-action increment"> + </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello />,
    document.body.appendChild(document.createElement('div')),
  )
})
