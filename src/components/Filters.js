import React, { Component } from 'react';

class Filters extends Component {
    render() {
        const ListFilters = this.props.listFilters.map((filter) => {
                let isExist = this.props.selectedFilter.filter((item) => (filter === item.name));
                if(!isExist.length) {
                    return <li className="filter-item" key={filter} name={filter} onClick={this.props.handleClick}>{filter}</li> 
                }
            }
        );
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