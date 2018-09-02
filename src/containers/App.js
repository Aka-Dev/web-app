import React, { Component } from 'react';
import './App.css';
import SearchBox from '../components/SearchBox';
import List from '../components/List';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersShadow: [],
      selectedFilter: [],
      hasSelectedFilter: false,
      visibility: 'hide',
      searchInputValue: '',
      listFilters: ['firstName', 'lastName', 'coutry', 'email'],
      items: []
    };
  
    // My FUNCTION
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteFilterItem = this.deleteFilterItem.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  // HANDLEFOCUS
  handleFocus() {
    this.setState({
        visibility: (this.state.hasSelectedFilter) ? 'hide' : 'show'
    });
  }

  // HANDLECHANGE
  handleChange(event) {
    const index = event.target.value.indexOf(' '),
          inputSearchValue = event.target.value.trim(),
          selectedFilter = this.state.selectedFilter;

    if(index > 0 && this.state.hasSelectedFilter) {
        selectedFilter[selectedFilter.length-1].value = inputSearchValue;
        event.target.value = '';
        this.setState({
          selectedFilter,
          hasSelectedFilter: false,
          visibility: 'show'
        });
    } 

    if(this.state.visibility === 'show') {
      let inputSearchValue = event.target.value,
          items = this.state.listFilters.filter((item) => (item.toLowerCase().includes(inputSearchValue)));
      this.setState({
          items
      });
    }

  }

  // HANDLECLICK
  handleClick(event) {
    const selectedFilter = this.state.selectedFilter;

    selectedFilter.push({
        name: event.target.innerHTML,
        value: ''
    });
    
    // Check if filter exist in the list of selected filter
    const items = this.state.items.filter((item) => (
      selectedFilter.filter((filter) => (filter === item))
    ));

    this.setState({
      selectedFilter,
      visibility: 'hide',
      hasSelectedFilter: true,
      items
    });

  }

  //DELTEFILTERITEM
  deleteFilterItem(event) {
    let selectedFilter = this.state.selectedFilter, 
        index = event.currentTarget.getAttribute('data-index');
    
    selectedFilter.splice(index, 1);

    // Check if filter exist in the list of selected filter
    const items = this.state.listFilters.filter((item) => (
      selectedFilter.filter((filter) => (filter === item))
    ));

    this.setState({
      usersShadow: (this.state.selectedFilter.length) ? this.state.usersShadow : this.state.users, 
      selectedFilter,
      hasSelectedFilter: false,
      items
    });
  }

  // HANDLEBLUR
  handleBlur(event) {
    this.setState({
      visibility: (event.currentTarget.className !== 'search-box') ? 'hide' : this.state.visibility
    });
  }

  // KeyPress
  handleKeyPress(event) {
    if(event.key === 'Enter') {
      const usersShadow = this.state.users.filter((user) => {
        let i = false;
        this.state.selectedFilter.forEach((filter) => {
          i = (filter.value == user[filter.name]) ? true : false;
        });
        return i;

      });

      this.setState({
        usersShadow
      });
    }
  }

  // COMPONENTDIDMOUNT
  componentDidMount() {
    axios.get('http://sanadtech-lab.appspot.com/')
    .then(res => {
        const users = res.data;
        this.setState({
          users,
          usersShadow: users
        });
    });
    this.setState({
      items: this.state.listFilters
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Search Box</h1>
        </header>
        <SearchBox inputSearch={this.inputSearch}
                   listFilters={this.state.items}  
                   selectedFilter={this.state.selectedFilter} 
                   visibility={this.state.visibility}                    
                   handleFocus={this.handleFocus}
                   handleChange={this.handleChange} 
                   handleClick={this.handleClick}
                   deleteFilterItem={this.deleteFilterItem}
                   handleBlur={this.handleBlur} 
                   handleKeyPress={this.handleKeyPress} />

        <List users={this.state.usersShadow} />
      </div>
    );
  }
}

export default App;
