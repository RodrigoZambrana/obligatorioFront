import React from 'react';
import Producto from './Producto';
import Header from './Header';
import Carrito from './Carrito';
import SearchBar from './SearchBar';
import { ListarProductos } from './services';
import Alert from 'react-bootstrap/Alert'
export default class PaginaInicial extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nombreProducto: '',
			listaProductos: [],
			productosComprados: [],
			productoFiltered: [],
			costoSubTotal: 0,
			costoTotal: 0,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleCardChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		if (sessionStorage.getItem("usuarioLogueado") !== "1") {
			return (window.location = '/Login');
		}

		ListarProductos().then(data =>
			this.setState({
				listaProductos: data
			})
		);
	}

	handleChange(e) {

		let currentList = [];
		let newList = [];
		if (e.target.value !== "") {
			currentList = this.state.listaProductos;
			newList = currentList.filter(item => {
				const lc = item.name.toLowerCase();
				const filter = e.target.value.toLowerCase();
				return lc.includes(filter);
			});
		} else {
			newList = this.state.listaProductos;
		}
		this.setState({
			productoFiltered: newList
		});
	}
	eliminarDelCarrito = unNombre => {
		const { productosComprados } = this.state;
		const productoEliminado = productosComprados.filter(producto => unNombre !== producto.name);
		this.setState({ productosComprados: productoEliminado });
		this.calcularTotal();
	};
	agregarAlCarrito = (nuevoProducto) => {
		let encontreProducto = this.state.productosComprados.find(producto => producto.name === nuevoProducto.name);
		if (!encontreProducto) {
			this.addNewItem(nuevoProducto);
		} else {
			let sinRepetido = this.state.productosComprados.filter(producto => producto.name !== nuevoProducto.name);
			let aumentarCantidad = sinRepetido.push({ ...encontreProducto, cantidad: encontreProducto.cantidad + 1 });
			this.setState({ productosComprados: sinRepetido });

		}
		this.calcularTotal();
	};

	addNewItem(producto) {
		const { productosComprados } = this.state;
		let newItem = {
			cantidad: 1,
			name: producto.name,
			price: producto.price,
		};
		this.setState({ productosComprados: [...productosComprados, newItem] });
	}

	calcularTotal = () => {
		let subTotal = 0;
		let aux = [];
		if (this.state.productosComprados.length === 0) {
			this.setState({
				costoSubTotal: 0,
				costoTotal: 0,
			});
		} else {
			this.state.productosComprados.forEach(producto => {
				subTotal = subTotal + ((producto.price).toFixed() * (producto.cantidad).toFixed());
				this.setState({ costoSubTotal: subTotal });
			});
			let total = subTotal + (subTotal * 22 / 100);
			this.setState({ costoTotal: total.toFixed() });
		}
	};

	finalizarCompra = () => {
		this.setState({
			nombreProducto: '',
			productosComprados: [],
			costoSubTotal: 0,
			costoTotal: 0,
		});
		alert("Compra Finalizada con exito!")
	};

	funcSalir = () => {
		this.setState({
			nombreProducto: '',
			productosComprados: [],
			costoSubTotal: 0,
			costoTotal: 0,
		});
		sessionStorage.clear();
		return (window.location = '/Login');
	};
	render() {
		return (
			<>
				<Header Salir={this.funcSalir} />
				<div className='mainPage row'>
					<Carrito productosComprados={this.state.productosComprados} totalPagar={this.state.costoTotal} subTotalPagar={this.state.costoSubTotal} eliminarProd={this.eliminarDelCarrito} finalizarCompra={this.finalizarCompra} />
					<SearchBar handleChange={this.handleChange} />
					{this.state.productoFiltered.length === 0 ? (
						//muestra todos los productos
						<div className='mainPage row '>
							<div className='col-md-12'><Alert variant="danger">
								No existen productos
								</Alert></div>
							{this.state.listaProductos.map((producto, index) =>
								<Producto key={index} producto={producto} agregarAlCarrito={this.agregarAlCarrito} />
							)}

						</div>


					) : (
							<div className='mainPage row '>
								{this.state.productoFiltered.map((producto, index) =>
									<Producto key={index} producto={producto} agregarAlCarrito={this.agregarAlCarrito} />
								)}
							</div>

						)

					}
				</div>
			</>
		);
	}
}
