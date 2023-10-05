import React, { useState } from 'react';
import './login-react.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
    };

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
        // Aquí puedes redirigir al usuario a la página de inicio, por ejemplo.
        window.location.href = "home";
      } else {
        // Error en el inicio de sesión
        setErrorMessage(`Error: ${data.msg}`);
      }
    } catch (error) {
      console.error(error);
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
              <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </div>
          </form>
          <div className="text-center mt-5">
            ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
          </div>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;