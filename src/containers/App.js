import React, { Component } from 'react';
import './App.css';
import List from '../components/List';
import SelectedFilter from '../components/SelectedFilter';
import Filters from '../components/Filters';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersShadow: [],
      selectedFilters: [],
      hasSelectedFilter: false,
      visibility: 'hide',
      searchInputValue: '',
      listFilters: ['firstName', 'lastName', 'coutry', 'email'],
      items: []
    };
  
    // Ref of input search
    this.inputSearchBox = React.createRef();

    // My FUNCTIONS
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteFilterItem = this.deleteFilterItem.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.filterUsers = this.filterUsers.bind(this);

  }

  // Filter users
  filterUsers() {
    return (this.state.users.filter((user) => {
      let i = false;

        for(let filter of this.state.selectedFilters) {
          let filterValue = filter.value.toLowerCase(),
              userValue = user[filter.name].toLowerCase();
          if (filterValue === userValue) {
            i = true;
          } else {
            i = false;
            break;
          }
        }
        return i;
      })
    );
  }

  // On Focus display the dropdown of filters items
  handleFocus() {
    this.setState({
        visibility: (this.state.hasSelectedFilter) ? 'hide' : 'show'
    });
  }

  
  handleChange(event) {
    const index = event.target.value.indexOf(' '),
          inputSearchValue = event.target.value.trim(),
          selectedFilters = this.state.selectedFilters;

    if(index > 0 && this.state.hasSelectedFilter) {
        selectedFilters[selectedFilters.length-1].value = inputSearchValue;
        event.target.value = '';
        this.setState({
          selectedFilters,
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
    
    // Change Placeholder in fact of filter name or value
    this.inputSearchBox.current.placeholder = (this.state.hasSelectedFilter ) ? 'Enter Filter Name' : 'Enter Filter Value';
    
    // If search input is empty and no filter is selected list all users
    if(inputSearchValue === '' && !this.state.selectedFilters.length) {
      this.setState({
        usersShadow: this.state.users
      });
    }

  }

  // HANDLECLICK
  handleClick(event) {
    const selectedFilters = this.state.selectedFilters;

    selectedFilters.push({
        name: event.target.innerHTML,
        value: ''
    });
    
    // Check if filter item exist in the list of selected filters items
    const items = this.state.items.filter((item) => (
      selectedFilters.filter((filter) => (filter === item))
    ));

    this.setState({
      selectedFilters,
      visibility: 'hide',
      hasSelectedFilter: true,
      items
    });

    // Clear input Search 
    this.inputSearchBox.current.value = '';
    // Change Placeholder in fact of filter name or value
    this.inputSearchBox.current.placeholder = (this.state.hasSelectedFilter) ? 'Enter Filter Name' : 'Enter Filter Value';
  }

  //DELTEFILTERITEM
  deleteFilterItem(event) {
    let selectedFilters = this.state.selectedFilters, 
        index = event.currentTarget.getAttribute('data-index');
    
    selectedFilters.splice(index, 1);

    // Check if filter exist in the list of selected filter
    const items = this.state.listFilters.filter((item) => (
      selectedFilters.filter((filter) => (filter === item))
    ));

    this.setState({
      usersShadow: (this.state.selectedFilters.length) ? this.filterUsers() : this.state.users, 
      selectedFilters,
      hasSelectedFilter: false,
      items,
      visibility: 'hide'
    });
    this.inputSearchBox.current.placeholder = 'Enter Filter Name';
  }

  // HANDLEBLUR
  handleBlur(event) {
    if(event.target.className !== 'input-search-box') {
      this.setState({
        visibility: 'hide'
      });
    }
  }

  // KeyPress
  handleKeyPress(event) {
    if(event.key === 'Enter') {
      const usersShadow = this.filterUsers();
      
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
    });
  }

  render() {
    return (
      <div className="App" onClick={this.handleBlur}>
        <header className="App-header">
          <h1 className="App-title">Search Box</h1>
        </header>
        <div className="search-box">

          <SelectedFilter selectedFilters={this.state.selectedFilters}
                          deleteFilterItem={this.deleteFilterItem}/> 

          <div className="dropdown-search-box">
            <input type="text" className="input-search-box" name="search-box" placeholder="Enter Filter Name"
                    ref={this.inputSearchBox}
                    onClick={this.handleFocus}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}/>

            <Filters listFilters={this.state.items} 
                    visibility={this.state.visibility} 
                    selectedFilters={this.state.selectedFilters}
                    handleClick={this.handleClick} />
          </div>
        </div>

        <List users={this.state.usersShadow} />
      </div>
    );
  }
}

export default App;
