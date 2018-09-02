import React, { Component } from 'react';
import Filters from './Filters';
import SelectedFilter from './SelectedFilter';

class SearchBox extends Component {
    render() {
        return (
            <div className="search-box" onBlur={this.props.handleBlur}>
                <SelectedFilter selectedFilter={this.props.selectedFilter}
                                deleteFilterItem={this.props.deleteFilterItem}/>
                <div className="dropdown-search-box">
                    <input type='text' className='input-search-box' name='search-box' 
                        ref={this.props.inputSearch}
                        onClick={this.props.handleFocus}
                        onChange={this.props.handleChange}
                        onKeyPress={this.props.handleKeyPress}/>

                    <Filters listFilters={this.props.listFilters} 
                            visibility={this.props.visibility} 
                            selectedFilter={this.props.selectedFilter}
                            handleClick={this.props.handleClick} />
                </div>
            </div>
        );
    }
}

export default SearchBox;