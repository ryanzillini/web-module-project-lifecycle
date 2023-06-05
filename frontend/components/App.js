import React from "react";
import axios from "axios";

const URL = "http://localhost:9001/api/todos";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: "",
      todoNameInput: "",
    };
  }

  postNewTodo = () => {
    axios
      .post(URL, { name: this.state.todoNameInput })
      .then((res) => {
        this.fetchAllTodos();
        this.resetForm();
      })
      .catch(this.setAxiosResponseError);
  };

  resetForm = () => {
    this.setState({ ...this.state, todoNameInput: "" });
  };
  setAxiosResponseError = () => {
    (err) => this.setState({ ...this.state, error: err.response.data.message });
  };

  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) => this.setState({ ...this.state, todos: res.data.data }))
      .catch(this.setAxiosResponseError());
  };

  onTodoFormSubmit = (evt) => {
    evt.preventDefault();
    this.postNewTodo();
  };

  componentDidMount() {
    this.fetchAllTodos();
  }

  onTodoNameInputChange = (evt) => {
    const { value } = evt.target;
    this.setState({ ...this.state, todoNameInput: value });
  };

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          {this.state.todos.map((td) => {
            return <div key={td.id}>{td.name}</div>;
          })}
        </div>
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input
            onChange={this.onTodoNameInputChange}
            value={this.state.todoNameInput}
            type="text"
            placeholder="Type todo"
          ></input>
          <input type="submit"></input>
          <button>Clear Completed</button>
        </form>
      </div>
    );
  }
}
