import React from 'react';
import Nav from 'react-bootstrap/Nav';

const SearchBar = ({ handleChange }) => (
    <div className='col-md-12'>
        <Nav className='navbar navbar-light col-12'>
            <input
                className='form-control col-12'
                type='search'
                placeholder='Ingrese nombre de producto'
                aria-label='Search'
                onChange={handleChange}
            />
        </Nav>
    </div>
);

export default SearchBar;