import React from 'react'
import ReactDOM from 'react-dom'

function TodoList(props) {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>{props.title}</h1>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus="" />
      </header>
      <section className="main">
        <input className="toggle-all" id="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          <li>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>todo</label>
              <button className="destroy"></button>
            </div>
            <input className="edit"  />
          </li>
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count"><strong>1</strong> item left</span>
        <ul className="filters">
          <li>
            <a className="selected" href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
      </footer>
    </section>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TodoList title="Todo List" />,
    document.body.appendChild(document.createElement('div')),
  )
})
