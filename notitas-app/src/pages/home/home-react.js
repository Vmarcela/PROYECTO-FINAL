import React, { useEffect, useState } from "react";
import "./home-react.css";
import $ from "jquery";

function Home() {
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [notaActual, setNotaActual] = useState(null);
  const [notasActualizadas, setNotasActualizadas] = useState(false); // Nuevo estado

  

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
        setNotasActualizadas(true); // Actualiza el estado de notasActualizadas
      })
      .catch((error) => {
        console.error("Error al obtener las notas desde la API:", error);
      });
  };

  const mostrarNotas = () => {
    return notas.map((nota) => (
      <div key={nota._id} className="col-md-3">
        <div className="card mb-4">
          <div className="card-body overflow-hidden">
            <h5 className="card-title">{nota.titulo}</h5>
            <p className="card-text">{nota.contenido}</p>
          </div>
          <div className="card-footer text-right border-0">
            <button
              className="btn btn-primary mr-5"
              onClick={() => editarNota(nota)}
            >
              Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => eliminarNota(nota._id)}
            >
              Eliminar
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
      })
      .catch((error) => {
        console.error("Error al enviar la nota:", error);
      });
  };

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
  };

  const editarNota = (nota) => {
    window.confirm("¿Estás seguro de que deseas Editar esta nota?");
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
        setNotasActualizadas(false); // Establece notasActualizadas en false
       /* obtenerNotasDesdeAPI(); // Actualiza la lista de notas después de editar
        setNotaActual(null); // Limpia la nota actual en el estado
        setTitulo(""); // Limpia el título y contenido en el estado
        setContenido("");*/

        // Recarga la página después de la actualización
        window.location.reload()
        window.location.href = window.location.href
      })
      .catch((error) => {
        console.error("Error al actualizar la nota:", error);
      });
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
            setNotasActualizadas(false); // Establece notasActualizadas en false  
            //obtenerNotasDesdeAPI(); // Actualiza la lista de notas después de eliminar una
          } else {
            console.error("Error al eliminar la nota:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la nota:", error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <nav class="navbar navbar-expand-lg navbar bg m-0 p-0">
        <div class="d-flex flex-grow-1 p-3 m-0 w-100">
          <a class="navbar-brand" href="#">
            Mi Aplicación
          </a>
          <div class="d-flex justify-content-between w-100">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Home
                </a>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/">
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <hr />

      <div className="row justify-content-center my-5">
        <div className="col-md-6">
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
        </div>
      </div>

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
          <div className="modal-content bg-dark text-white">
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
                  <label htmlFor="titulo" className="form-label text-white">
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
                  <label htmlFor="contenido" className="form-label text-white">
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
                className="btn btn-primary"
                onClick={notaActual ? guardarNotaEditada : crearNotaNueva}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
