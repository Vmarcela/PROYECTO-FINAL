import React, { useState } from "react";
import "./register-react.css";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [pais, setPais] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [genero, setGenero] = useState("");
  const [fecha, setFecha] = useState("");
  const [documento, setDocumento] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      nombres: nombre,
      apellidos: apellido,
      pais,
      email,
      password,
      telefono,
      genero,
      f_nacimiento: fecha,
      dni: documento,
    };

    try {
      const response = await fetch("http://127.0.0.1:3002/register_client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Registro exitoso
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        // Redirige al usuario a la página de inicio de sesión
        window.location.href = "/login";
      } else {
        // Error en el registro
        setErrorMessage(`Error: ${data.msg}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 mb-5">
          <h2 className="text-center my-5">Registro de Usuario</h2>
          <form onSubmit={handleSubmit} id="registroForm">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text mt-3" htmlFor="nombre">
                    Nombres:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text mt-3" htmlFor="apellido">
                    Apellidos:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text mt-3" htmlFor="email">
                    Correo Electronico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text mt-3" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text mt-3" htmlFor="pais">
                    País: (opcional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pais"
                    name="pais"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text mt-3" htmlFor="telefono">
                    Telefono: (opcional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text mt-3" htmlFor="genero">
                    Genero: (opcional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="genero"
                    name="genero"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text mt-3" htmlFor="fecha">
                    Fecha nacimiento: (opcional)
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fecha"
                    name="fecha"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="text mt-3" htmlFor="documento">
                    N° documento de identidad: (opcional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="documento"
                    name="documento"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>
          </form>
          <div className="login-link text text-center mt-3">
            ¿Ya tienes una cuenta? <a href="./login">Iniciar Sesión</a>
          </div>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default Register;
