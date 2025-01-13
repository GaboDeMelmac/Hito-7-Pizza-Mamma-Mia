import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import Pizza from "./pages/Pizza.jsx";
import Cart from "./pages/Cart.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/CSS/styles.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react"; // Asegúrate de importar useContext
import { CardContext } from "./context/CardContext.jsx"; // Asegúrate de que el contexto esté correctamente importado

function App() {
  const { token } = useContext(CardContext); // Ahora accedes al contexto correctamente

  return (
    <>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/Hito-7-Pizza-Mamma-Mia" element={<Home></Home>}></Route>

          {/* Rutas Login y Register solo si el token es falso */}
          <Route
            path="/register"
            element={
              token ? <Navigate to="/home"></Navigate> : <Register></Register>
            }
          ></Route>
          <Route
            path="/login"
            element={token ? <Navigate to="/home"></Navigate> : <Login></Login>}
          ></Route>
          {/* Rutas protegidas */}
          <Route
            path="/profile"
            element={
              token ? <Profile></Profile> : <Navigate to="/login"></Navigate>
            }
          ></Route>
          {/* Rutas públicas */}
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/pizza/:id" element={<Pizza></Pizza>}></Route>
          <Route path="/404" element={<NotFound></NotFound>}></Route>
          <Route path="/*" element={<NotFound></NotFound>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
