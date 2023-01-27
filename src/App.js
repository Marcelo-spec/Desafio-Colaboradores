import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { Base } from './Base';

function App () {
  const [colaboradores, setColaboradores] = useState( Base )
  const [nombre, setNombre] = useState( '' )
  const [correo, setCorreo] = useState( '' )
  const [error, setError] = useState( false )
  const [mensajeError, setMensajeError] = useState( '' )
  const [busqueda, setBusqueda] = useState( '' )

  const handleChange = ( e ) => {
    if ( e.target.name === 'nombre' ) {
      setNombre( e.target.value )
      setError( false )
    } else if ( e.target.name === 'correo' ) {
      setCorreo( e.target.value )
      setError( false )
    }
  }

  const handleSubmit = ( e ) => {
    e.preventDefault()
    const nuevoColaborador = {
      id: colaboradores.length + 1,
      nombre,
      correo
    }

    if ( nombre.trim() === '' || correo.trim() === '' ) {
      setError( true )
      setMensajeError( 'Debes completar los campos requeridos' )
      return
    } else {
      setColaboradores( [...colaboradores, nuevoColaborador] )
      setNombre( '' )
      setCorreo( '' )
    }
  }

  const handleSearch = ( e ) => {
    setBusqueda( e.target.value )
  }

  const resultadoBusqueda = !busqueda ? colaboradores : colaboradores.filter( colaborador => {
    return colaborador.nombre.toLowerCase().includes( busqueda.toLowerCase() )
  } )

  return (
    <div className="container mt-3" style={ { maxWidth: "800px" } }>
      <nav className='navbar bg-dark'>
        <div className='container-fluid d-flex align-items-end'>
          <h3 className='text-white'>Buscador de colaboradores</h3>
          <div>
            <input
              className='form-control'
              type='text'
              placeholder='Buscar por nombre'
              aria-label='search'
              value={ busqueda }
              onChange={ handleSearch }
            />
          </div>
        </div>
      </nav>

      <form onSubmit={ handleSubmit } className="mb-5">
        { error && <p className='alert alert-danger mt-3'>{ mensajeError }</p> }
        <div className='form-group mt-3'>
          <label>Nombre del colaborador</label>
          <input
            name='nombre'
            type='text'
            placeholder='Ingrese el nombre del colaborador'
            className='form-control'
            onChange={ handleChange }
            value={ nombre }
          />
        </div>
        <div className='form-group'>
          <label>Correo del colaborador</label>
          <input
            name='correo'
            type='email'
            placeholder='Ingrese el correo del colaborador'
            className='form-control'
            onChange={ handleChange }
            value={ correo }
          />
        </div>
        <div>
          <button className='btn btn-primary mt-2'>Agregar Colaborador</button>
        </div>
      </form>
      <hr />
      <h3 className="text-center">Listado de Colaboradores</h3>
      <hr />
      { resultadoBusqueda.map( colaborador => (
        <div key={ colaborador.id }>
          <div className="row no-gutters">
            <div>
            </div>
            <div>
              <div>
                <h5>Nombre: { colaborador.nombre }</h5>
                <p>Email: { colaborador.correo }</p>
                <hr/>
              </div>
            </div>
          </div>
        </div>
      ) ) }

    </div >
  );
}

export default App;
