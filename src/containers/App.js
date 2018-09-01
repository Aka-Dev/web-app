import React, { Component } from 'react';
import './App.css';
import SearchBox from '../components/SearchBox';
import List from '../components/List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  onChangeValue(event) {
    this.setState({
      value: event.target.value
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Search Box</h1>
        </header>
        <SearchBox onChangeValue={this.onChangeValue}/>
        <List filter={this.state.value}/>
      </div>
    );
  }
}

export default App;
