import React, { useEffect, useState } from "react";
import "./home-react.css";
import $ from "jquery";

function Home() {
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [editId, setEditId] = useState(null);

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
        <div className="card mb-4">
          <div className="card-body overflow-hidden">
            <h5 className="card-title">{nota.titulo}</h5>
            <p className="card-text">{nota.contenido}</p>
          </div>
          <div className="card-footer text-right border-0">
            <button
              className="btn btn-primary mr-2"
              onClick={() => editarNota(nota._id)}
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

  function generarID() {
    return Math.random().toString(36).substring(2, 15);
  }

  const crearNotaNueva = () => {
    const nuevaNotaEjemplo = {
      _id: Math.random().toString(36).substring(2, 15),
      titulo: "Título de Ejemplo",
      contenido: "Contenido de Ejemplo",
    };

    setNotas([...notas, nuevaNotaEjemplo]);
  };

  const agregarNotaNueva = () => {
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

  function editarNota(_id) {
    fetch(`http://localhost:3002/notes/${_id}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            return null;
          }
          return null;
        }
        return response.json();
      })
      .then((nota) => {
        if (nota !== null) {
          setTitulo(nota.titulo);
          setContenido(nota.contenido);
        }
      })
      .catch((error) => {
        // Manejar errores generales aquí
      });
  }
  
    

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
            // Puedes realizar acciones adicionales si es necesario
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
      <div className="row justify-content-center my-5">
        <div className="col-md-6 offset-md-3">
          <button
            className="btn btn-primary btn-lg btn-block"
            data-bs-toggle="modal"
            data-bs-target="#modalNuevaNota"
          >
            Agregar Nueva Nota
          </button>
        </div>
        <div className="col-md-6 offset-md-3">
          <button
            className="btn btn-primary btn-lg btn-block"
            id="botonTest"
            onClick={crearNotaNueva}
          >
            Test Nueva Nota
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
                onClick={agregarNotaNueva}
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
