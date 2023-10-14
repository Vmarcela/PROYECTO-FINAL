import React, { useState } from 'react';
import './login-react.css';
import Spinner from 'react-bootstrap/Spinner';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
    };
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:3002/login_client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // Aquí puedes redirigir al usuario a la página de inicio.
        window.location.href = "home";
      } else {
        // Error en el inicio de sesión
        console.log(setErrorMessage(`Error: ${data.msg}`));
        setErrorMessage(`Error: Usuario o clave incorrectos`);
      }
    } catch (error) {
      console.error(error);

    } finally {
      setIsLoading(false); // Ocultar la animación de carga después de procesar la solicitud
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 mb-5">
          <h2 className="text-center my-5">Inicio de Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text" htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="text" htmlFor="password">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center mt-5">
              <button type="submit" className="btn btn-primary">Iniciar Sesión
              </button>
            </div>
            <div className='d-flex justify-content-center m-4'>
            {isLoading && ( // Muestra la animación de carga si isLoading es true
              <Spinner animation="border" role="status" >
              <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            </div>
          </form>
          {errorMessage && <div className="text-danger text-center">{errorMessage}</div>}
          <div className="text-center mt-4">
            ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;