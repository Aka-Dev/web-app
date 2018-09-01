import React, { Component } from 'react';

class Filters extends Component {
    render() {
        const ListFilters = this.props.listFilter.map((filter) => 
            <li className="filter-item" key={filter} name={filter} onClick={this.props.handleClick}>{filter}</li> 
        );
        console.log(ListFilters);
        return (
            <div className="dropdown-filters">
                <ul className={this.props.visibility + ' list-style-none'}>
                    {ListFilters}
                </ul>
            </div>
        );
    }
}

export default Filters;