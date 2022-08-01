// import logo from './logo.svg';
import './App.css';
import { useReducer } from 'react';

const Header = (props) => {
  return (
    <header className="header">
      <h1>{props.title ?? "Default"}</h1>
    </header>
  )
}

const FILTER_ITEMS = {
  'ALL': { title: 'All' },
  'ACTIVE': { title: 'Active' },
  'COMPLETED': { title: 'Completed' }
}

const Filter = (props) => {
  const { titleForAll, titleForActive, titleForCompleted, selected } = props

  return (
    <ul className="filters">
      <li>
        <a className={selected === 'ALL' ? "selected" : ""} href="#/">{titleForAll ?? FILTER_ITEMS['ALL'].title}</a>
      </li>
      <li>
        <a className={selected === 'ACTIVE' ? "selected" : ""} href="#/active">{titleForActive ?? FILTER_ITEMS['ACTIVE'].title}</a>
      </li>
      <li>
        <a className={selected === 'COMPLETED' ? "selected" : ""} href="#/completed">{titleForCompleted ?? FILTER_ITEMS['COMPLETED'].title}</a>
      </li>
    </ul>
  )
}

const initialData = {
  title: 'todos',
  newTodoText: '',
  todos: [
    {
      status: 'COMPLETED',
      text: 'Learn React'
    },
    {
      status: 'ACTIVE',
      text: 'Learn React 2'
    }
  ],
  titleForAll: 'All',
  titleForActive: 'Active',
  titleForCompleted: 'Completed',
  selectedFilter: 'ALL'
}

function reducer(state, action) {
  switch (action.type) {
    case 'setNewTodoText': {
      return { ...state, newTodoText: action.payload }
    }

    case 'addTodo': {
      let _todos = [...state.todos]
      // const _index = action.payload.index
      // const _todo = { ..._todos[_index], status: 'COMPLETED' }

      // _todos.splice(_index, 1, _todo)
      return { ...state, todos: _todos }
    }

    case 'deleteTodo': {
      let _todos = [...state.todos]
      // const _index = action.payload.index
      // const _todo = { ..._todos[_index], status: 'COMPLETED' }

      // _todos.splice(_index, 1, _todo)
      return { ...state, todos: _todos }
    }

    case 'completeTodo': {
      let _todos = [...state.todos]
      const _index = action.payload.index
      const _todo = { ..._todos[_index], status: 'COMPLETED' }

      _todos.splice(_index, 1, _todo)
      return { ...state, todos: _todos }
    }

    case 'changeTodo': {//index, text
      let _todos = [...state.todos]
      // const _index = action.payload.index
      // const _todo = { ..._todos[_index], text: action.payload.text }

      // _todos.splice(_index, 1, _todo)
      return { ...state, todos: _todos }
    }

    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialData);

  const onChangeNewTodoText = (evt) => {
    dispatch({ type: 'setNewTodoText', payload: evt.target.value })
  }

  const onAddTodo = (evt) => {
    if (evt.keyCode === 13) {
      console.log('Enter key pressed', state.newTodoText)
    }
  }

  const onComplete = (index) => {
    console.log('index: ', index)
    dispatch({ type: 'completeTodo', payload: { index } })
  }

  const onDelete = (index) => {
    console.log('index: ', index)
    dispatch({ type: 'deleteTodo', payload: { index } })
  }

  const onChangeText = (index, text) => {
    console.log('index: ', index)
    dispatch({ type: 'changeTodo', payload: { index, text } })
  }

  return (
    <>
      <section className="todoapp">
        <Header title={state.title} />
        <input className="new-todo" placeholder="What needs to be done?" autoFocus value={state.newTodoText} onChange={onChangeNewTodoText} onKeyDown={onAddTodo} />
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {state.todos.map((itm, index) => {
              return <li key={index} className={itm.status === 'COMPLETED' ? "completed" : ""}>
                <div className="view">
                  <input className="toggle1" type="checkbox" checked={itm.status === 'COMPLETED' ? true : false} onChange={() => { onComplete(index) }} />
                  {itm.status === 'COMPLETED' ? <label>{itm.text}</label> : <input className="edit" value={itm.text} onChange={(evt) => { console.log(evt.target.value); onChangeText(index, evt.target.value) }} />}
                  <button className="destroy" onClick={() => { onDelete(index) }}></button>
                </div>
              </li>
            })}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item left</span>
          <Filter titleForAll={state.titleForAll} titleForActive={state.titleForActive} titleForCompleted={state.titleForCompleted} selected={state.selectedFilter} />
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    </>
  );
}

export default App;
