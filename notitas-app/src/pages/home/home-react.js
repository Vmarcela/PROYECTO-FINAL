import React, { useEffect, useState} from "react";
import "./home-react.css";
import $ from "jquery";


function Home() {
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [notaActual, setNotaActual] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Extraer el nombre de usuario del localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  
  useEffect(() => {
    obtenerNotasDesdeAPI();
  }, []);



  const obtenerNotasDesdeAPI = () => {
    fetch("http://localhost:3002/notes", {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((notasDesdeAPI) => {
        setNotas(notasDesdeAPI);
      })
      .catch((error) => {
        console.error("Error al obtener las notas desde la API:", error);
      });
  };

  const mostrarNotas = () => {
    return notas.map((nota) => (
      <div key={nota._id} className="col-md-3">
        <div className="card mb-4 text-bg-warning">
          <div className="-div-btn-danger">
            <button        
                className="btn btn-danger"
                onClick={() => eliminarNota(nota._id)}
              >
                X             
            </button>  
          </div>   
          <div className="card-body overflow-hidden">
            <h5 className="card-title">{nota.titulo}</h5>
            <p className="card-text">{nota.contenido}</p>
          </div>
          <div className="card-footer text-center border-0">
            <button
              className="btn btn-outline-dark btn-sm mr-5"
              onClick={() => editarNota(nota)}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const generarID = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const crearNotaNueva = () => {
    const nuevoID = generarID();

    const nuevaNota = {
      id: nuevoID,
      titulo: titulo,
      contenido: contenido,
    };

    fetch("http://127.0.0.1:3002/notes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaNota),
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();

      })
      .catch((error) => {
        console.error("Error al enviar la nota:", error);
      });
  };

  /*
    //Codigo para el boton test nota nueva
    const agregarNotaNueva = (event) => {
    const titulo = "titulo";
    const contenido = "Dummy contenido";

    const nuevoID = generarID();

    const nuevaNota = {
      id: nuevoID,
      titulo: titulo,
      contenido: contenido,
    };

    fetch("http://127.0.0.1:3002/notes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaNota),
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error al enviar la nota:", error);
      });
  };*/

  const editarNota = (nota) => {
    //window.confirm("¿Estás seguro de que deseas Editar esta nota?");
    setNotaActual(nota); // Guarda la nota que se va a editar en el estado
    setTitulo(nota.titulo); // Establece el título y contenido actuales en el estado
    setContenido(nota.contenido);
    window.$("#modalNuevaNota").modal("show");
  };

  const guardarNotaEditada = () => {
    if (!titulo || !contenido) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const notaEditada = {
      _id: notaActual._id,
      titulo: titulo,
      contenido: contenido,
    };

    fetch(`http://localhost:3002/notes/update/${notaActual._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notaEditada),
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((notaActualizada) => {
        console.log("Nota actualizada:", notaActualizada);
        $("#modalNuevaNota").modal("hide"); // Cierra el modal después de actualizar
        /* obtenerNotasDesdeAPI(); // Actualiza la lista de notas después de editar
        setNotaActual(null); // Limpia la nota actual en el estado
        setTitulo(""); // Limpia el título y contenido en el estado
        setContenido("");*/

        // Recarga la página después de la actualización
        /*window.location.reload()
        window.location.href = window.location.href*/
      })
      .catch((error) => {
        console.error("Error al actualizar la nota:", error);
      });;
      window.location.reload()
  };

  const eliminarNota = (_id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta nota?")) {
      fetch(`http://localhost:3002/notes/delete/${_id}`, {
        method: "DELETE",
        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Nota eliminada con éxito");
            //obtenerNotasDesdeAPI(); // Actualiza la lista de notas después de eliminar una
            const notasActualizadas = notas.filter((nota) => nota._id !== _id);
            setNotas(notasActualizadas);
          } else {
            console.error("Error al eliminar la nota:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la nota:", error);
        });
      window.location.reload();
    }
  };

  return (
    <div className="container mt-5">
      <nav className="d-block navbar navbar-expand-lg navbar bg m-0 p-0 ">
        <section className="d-flex justify-content-between ">
          <ul className="navbar-nav d-flex justify-content-between w-100">
                <li className="nav-item">
                  <a className="nav-link" href="/home">
                    Home
                  </a>
                </li>
                <li>
                <h5>Bienvenid@ {userName}!</h5>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Cerrar Sesión
                  </a>
                </li>
            </ul>
        </section>
        <section className="d-flex justify-content-center">
          <h1> Tus notas </h1>
        </section>
      </nav>

      <hr />

      <section className="row d-flex justify-content-center my-5">
        {/*<div className="col-md-6 d-flex ">
          <button
            className="btn btn-success btn-lg mx-auto"
            data-bs-toggle="modal"
            data-bs-target="#modalNuevaNota"
          >
            Agregar nueva nota
          </button>
        </div>
        <div className="col-md-6">
          <button
            id="botonTest"
            className="btn btn-success btn-lg mx-auto"
            onClick={agregarNotaNueva}
          >
            Test nueva nota
          </button>
        </div>*/}
      </section>

      <div className="row mt-5" id="notaContainer">
          {mostrarNotas()}
      </div>
      <div
        className="modal fade"
        id="modalNuevaNota"
        tabIndex="-1"
        aria-labelledby="modalNuevaNotaLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content bg-warning-subtle">
            <div className="modal-header">
              <h5 className="modal-title" id="modalNuevaNotaLabel">
                Nueva Nota
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="formularioNuevaNota">
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contenido" className="form-label">
                    Contenido
                  </label>
                  <textarea
                    className="form-control"
                    id="contenido"
                    name="contenido"
                    rows="4"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={notaActual ? guardarNotaEditada : crearNotaNueva}
                data-bs-dismiss="modal"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="position-fixed bottom-0 end-0 pb-4 pe-5">
        <div className="col-md-6 d-flex justify-content-center">
          <button
            className="btn btn-success btn-lg mx-auto rounded-circle"
            data-bs-toggle="modal"
            data-bs-target="#modalNuevaNota"
          >
            +
          </button>
        </div>
        {/*<div className="col-md-6">
          <button
            id="botonTest"
            className="btn btn-success btn-lg mx-auto"
            onClick={agregarNotaNueva}
          >
            Test nueva nota
          </button>
      </div>*/}
      </section>
    </div>
  );
}

export default Home;
