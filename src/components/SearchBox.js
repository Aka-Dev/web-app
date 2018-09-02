import React, { Component } from 'react';

class SearchBox extends Component {
    render() {
        return (
            <div>
                <input type='text' className='input-search-box' name='search-box' 
                    onClick={this.props.handleFocus}
                    onChange={this.props.handleChange}
                    onKeyPress={this.props.handleKeyPress}/>
            </div>
        );
    }
}

export default SearchBox;