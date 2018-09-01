import React, { Component } from 'react';
import axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: []
        };
    }

    componentDidMount() {
        axios.get('http://sanadtech-lab.appspot.com/')
            .then(res => {
                const persons = res.data;
                this.setState({persons});
            });
    }

    render() {
        const listPersons = this.state.persons.map((person, index) => 
            <tr key={index}>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.coutry}</td>
                <td>{person.email}</td>
            </tr>
        );
        return (
            <div className="">
                <h2>List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Country</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPersons}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>{this.props.filter}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default List;