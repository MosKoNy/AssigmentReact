import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const todoStore = JSON.parse(localStorage.getItem('todoAssigmentKobchai')) || [];
const todoStoreId = JSON.parse(localStorage.getItem('todoAssigmentidKobchai')) || [];

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: todoStore,
	  countid: todoStoreId
    }
  }
  addTodo(val){
	if(val != "" || val.trim() != ""){
		if(this.state.countid.length <= 0){
			var nextId = 100000;
		}else{
			var nextId = this.state.countid + 1
		}
		this.setState({countid: nextId})
		localStorage.setItem('todoAssigmentidKobchai', JSON.stringify(nextId));
		var varAddTodo = {id: nextId, text: val, validity:false, date:new Date().toLocaleDateString()
	}
	var addRow = this.state.data
	addRow.push(varAddTodo);
	localStorage.setItem('todoAssigmentKobchai', JSON.stringify(addRow));
    this.setState({data: this.state.data});
	}
  }
  handleRemove(id){
    const remainder = JSON.parse(localStorage.getItem('todoAssigmentKobchai')).filter((todo) => {
      if(todo.id !== id) return todo;
    });
	localStorage.setItem('todoAssigmentKobchai', JSON.stringify(remainder));
	this.setState({data: remainder});
  }
  handleValidity(id){
	var update = this.state.data
	for(var i = 0;i < update.length;i++){
		if(update[i].id == id){
			if(update[i].validity == false){
				update[i].validity = true
			}else{
				update[i].validity = false
			}
		}
	}
	localStorage.setItem('todoAssigmentKobchai', JSON.stringify(update));
    this.setState({data: update});
  }
  handleFilter(val){
	  if(val == "All"){
			const remainder = todoStore
			this.setState({data: remainder});
	  }else if(val == "Todo"){
			const remainder = todoStore.filter((todo) => {
				if(todo.validity != true) return todo;
			});
			this.setState({data: remainder});
	  }else if(val == "Completed"){
			const remainder = todoStore.filter((todo) => {
				if(todo.validity == true) return todo;
			});
			this.setState({data: remainder});
	  }
  }
  render(){
    return (
      	<div className="App">
        	<div className="App-header">
          	<img src={logo} className="App-logo" alt="logo" />
          	<h2>Welcome to Assigment</h2>
        	</div>
        	<p className="App-intro">
          		Reminders
        	</p>
			<div className="App-content">
				<TodoForm addTodo={this.addTodo.bind(this)}/>
				<Filter
					handleFilter={this.handleFilter.bind(this)}
				/>
				<hr />
				<TodoList 
					todos={this.state.data} 
					remove={this.handleRemove.bind(this)}
					validity={this.handleValidity.bind(this)}
				/>
			</div>
      	</div>
    );
  }
}

const TodoForm = ({addTodo}) => {
	let input;
	return (
		<div className="App-form">
		  <input placeholder='Enter Todo list . . .' ref={node => {
			input = node;
		  }} />
		  <button onClick={() => {
			addTodo(input.value);
			input.value = '';
		  }}>
			+
		  </button>
		</div>
  	);
}

const Filter = ({handleFilter}) => {
	return (
		<div className="Filter">
			<count />
			<a href="#" onClick={() => handleFilter("All")}>All</a>  
			<a href="#" onClick={() => handleFilter("Todo")}>Todo</a>  
			<a href="#" onClick={() => handleFilter("Completed")}>Completed</a>
		</div>
	)
}

const Todo = ({todo, remove, validity}) => {
	if(todo.validity == true){
		return (<li><a href="#" className="line-through"><input type="checkbox" checked onClick={() => validity(todo.id)}/><button onClick={() => remove(todo.id)}> x </button>{todo.text}</a></li>);
	}else{
		return (<li><a href="#" ><input type="checkbox" onClick={() => validity(todo.id)}/><button onClick={() => remove(todo.id)}> x </button>{todo.text}</a></li>);
	}
}

const TodoList = ({todos, remove, validity}) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} validity={validity}/>)
  });
  return (<ul>{todoNode}</ul>);
}


export default App;
