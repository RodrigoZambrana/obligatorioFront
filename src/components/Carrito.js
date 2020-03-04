import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Carrito = ({ productosComprados, totalPagar, subTotalPagar, eliminarProd, finalizarCompra }) => (

  productosComprados.length === 0 ? (
    //costo total= 0 ¿como agregar?
    <div className='cartContainer'>
      <Alert variant="success">
        <Alert.Heading>No hay productos en tu carrito</Alert.Heading>
        <p>Comienza ahora!</p>

      </Alert>
    </div>
  ) : (
      <div className='cartContainer'>
        <Table responsive >
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Precio Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {productosComprados.map((producto, index) =>
              <tr>
                <td>{producto.cantidad}</td>
                <td key={index}>{producto.name}</td>
                <td>{producto.price}</td>
                <td>{producto.price * producto.cantidad.toFixed()}</td>
                <Button
                  variant='primary'
                  type="button"

                  onClick={() => eliminarProd(producto.name)}
                //   onClick siempre debe ser una función! No poner una invocación a una función!
                >
                  Eliminar
                  </Button>
              </tr>
            )}
            <tr col-span="5"> Sub-Total:$
            <td>{subTotalPagar}</td>
            </tr>
            <tr>Total(IVA):$
            <td>{totalPagar}</td>
            </tr>
          </tbody>

        </Table>

        <Button variant='primary' type='submit' onClick={() => finalizarCompra()}>
          Finaliza tu compra
  </Button>
      </div>
    )

);
export default Carrito;
