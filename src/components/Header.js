import React from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

const Header = ({ Salir }) => (
	<header className='App-header'>
		<div className='col-md-12'>
			<Nav className='navbar navbar-light col-12'>
				<Form className='form-inline col-12'>
					<Button
						type='Button'
						onClick={Salir}
						value="Salir"
					>Salir</Button>
				</Form>
			</Nav>
		</div>
	</header>
);

export default Header;
