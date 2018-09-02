import React, { Component } from 'react';

class List extends Component {
    render() {

        const users = this.props.users.map((person, index) => (<tr key={index}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.coutry}</td>
            <td>{person.email}</td>
        </tr>));
        
        return (
            <div>
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
                        {users}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;