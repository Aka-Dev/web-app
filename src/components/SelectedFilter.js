import React, { Component } from 'react';
import Close from '../svg/cancel.svg';

class SelectedFilter extends Component {
    render() {
        const selectedFilter = this.props.selectedFilter.map((filter, index) =>                     
            <li key={index} name={filter.name} className="flex-container">
                <div className="selected-item flex-container"><span>{filter.name}</span><span className="selected-item-value">{filter.value}</span><span className="close" onClick={this.props.deleteFilterItem} data-index={index}><img src={Close} title="close" alt="close" /></span></div>
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