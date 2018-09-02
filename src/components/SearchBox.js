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
        this.handleClick = this.handleClick.bind(this);
        this.deleteFilterItem = this.deleteFilterItem.bind(this);
    }

    handleFocus() {
        this.setState({
            visibility: 'show'
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


        this.setState({
            selectedFilter,
            visibility: 'hide',
            hasSelectedFilter: !this.state.hasSelectedFilter
        });
    }

    deleteFilterItem(event) {
        let selectedFilter = this.state.selectedFilter, 
            index = event.currentTarget.getAttribute('data-index');
        selectedFilter.splice(index, 1);
        this.setState({
            selectedFilter
        });
    }

    render() {
        return (
            <div className="search-box">
                <SelectedFilter selectedFilter={this.state.selectedFilter}
                                deleteFilterItem={this.deleteFilterItem}/>
                <div className="dropdown-search-box">
                    <input type='text' className='input-search-box' name='search-box' 
                        ref={this.searchInput}
                        onClick={this.handleFocus}/>

                    <Filters listFilters={this.state.listFilters} 
                            visibility={this.state.visibility} 
                            selectedFilter={this.state.selectedFilter}
                            handleClick={this.handleClick} />
                </div>
            </div>
        );
    }
}

export default SearchBox;