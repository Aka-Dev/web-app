import React, { Component } from 'react';
import Close from '../svg/cancel.svg';

class SelectedFilter extends Component {
    render() {
        const selectedFilters = this.props.selectedFilters.map((filter, index) =>                     
            <li key={index} name={filter.name} className="flex-container">
                <div className="selected-item flex-container"><span>{filter.name}</span><span className="selected-item-value">{filter.value}</span><span className="close" onClick={this.props.deleteFilterItem} data-index={index}><img src={Close} title="close" alt="close" /></span></div>
            </li>
        );
        return (
            <div className="selected-filter">
                <ul className="ul-selected-filter list-style-none flex-container">
                    {selectedFilters}
                </ul>
            </div>
        );
    }
}

export default SelectedFilter;