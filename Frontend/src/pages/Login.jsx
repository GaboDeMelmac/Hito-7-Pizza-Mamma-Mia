import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Usar useNavigate para redirigir
import { CardContext } from "../context/CardContext"; // Asegúrate de importar CardContext

const Login = () => {
  const [email, SetEmail] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate(); // Usamos useNavigate para redirigir
  const { setToken } = useContext(CardContext); // Accedemos a setToken desde el contexto

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(clave.length);
    // Validaciones
    if (email === "" || clave === "") {
      alert("Favor introducir su email y clave.");
    } else if (clave.length < 6) {
      alert("Favor ingresar su clave con más de 6 dígitos.");
    } else {
      // Si las credenciales son correctas
      alert("¡Usted se ha logeado con éxito, Bienvenido!");
      setToken(true); // Asignamos el token para marcar como autenticado
      navigate("/home"); // Redirigimos a la página de inicio
    }
  };

  return (
    <>
      <div className="Formulario_login">
        <div>
          <h2>Login</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          {" "}
          {/* Usamos onSubmit para el formulario */}
          <Form.Group
            className="mb-3 d-flex flex-column"
            controlId="formBasicEmail"
          >
            <Form.Label>Email</Form.Label>
            <input
              type="email"
              placeholder="Ingresar email"
              onChange={(eve) => SetEmail(eve.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex flex-column"
            controlId="formBasicPassword"
          >
            <Form.Label>Contraseña</Form.Label>
            <input
              type="password"
              placeholder="Ingresar password"
              onChange={(eve) => setClave(eve.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
