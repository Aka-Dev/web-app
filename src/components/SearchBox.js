import React, { Component } from 'react';
import Filters from './Filters';
import SelectedFilter from './SelectedFilter';

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listFilters: ['FirstName', 'LastName', 'Country', 'Email'],
            filters: [],
            selectedFilter: [],
            hasSelectedFilter: false,
            visibility: 'hide'
        };

        this.searchInput = React.createRef(); 
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleFocus() {
        this.setState({
            visibility: 'show',
            filters: this.state.filters
        });
    }

    handleChange(event) {
        const filters = this.state.listFilters.filter((item) => 
                        item.toLowerCase().includes(event.target.value.toLowerCase()));

        this.setState({
            filters
        });
    }

    handleClick(event) {
        const selectedFilter = this.state.selectedFilter,
                hasSpace = event.target.innerHTML.indexOf(' ');

        if(hasSpace === -1) {
            selectedFilter.push({
                name: event.target.innerHTML,
                value: ''
            });
        } else {
            selectedFilter[selectedFilter.length - 1].value = event.target.innerHTML;
        }
        
        this.searchInput.current.value = '';

        let filters =  this.state.filters.filter((filter) => {
                let tab = selectedFilter.filter((item) => item.name === filter);
                return (tab.length === 0); 
            }
        );

        this.setState({
            selectedFilter,
            filters,
            visibility: 'hide',
            hasSelectedFilter: !this.state.hasSelectedFilter
        });
    }

    componentDidMount() {
        this.setState({
            filters: this.state.listFilters
        });
    }
    render() {

        return (
            <div className="search-box">
                <SelectedFilter selectedFilter={this.state.selectedFilter}/>
                <div className="dropdown-search-box">
                    <input type='text' className='input-search-box' name='search-box' 
                        ref={this.searchInput}
                        onChange={this.handleChange} 
                        onClick={this.handleFocus}/>

                    <Filters listFilter={this.state.filters} 
                            visibility={this.state.visibility} 
                            selectedFilter={this.state.selectedFilter}
                            handleClick={this.handleClick} />
                </div>
            </div>
        );
    }
}

export default SearchBox;