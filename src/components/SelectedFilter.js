import React, { Component } from 'react';

class SelectedFilter extends Component {
    render() {
        const selectedFilter = this.props.selectedFilter.map((filter, index) =>                     
            <li key={index} name={filter.name} >
                {filter.name}
                {/* {if(filter.value) { filter.value }} */}
            </li>
        );
        return (
            <div className="selected-filter">
                <ul className="ul-selected-filter list-style-none flex-container">
                    {selectedFilter}
                </ul>
            </div>
        );
    }
}

export default SelectedFilter;