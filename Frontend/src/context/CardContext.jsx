import { createContext, useState, useEffect } from "react";

// Creamos el contexto
export const CardContext = createContext();

const CounterProvider = ({ children }) => {
  // Estado del carrito
  const [pizzasCarrito, setPizzasCarrito] = useState([]);
  // Estado para las pizzas que vienen de la API
  const [info, setInfo] = useState([]);
  // Estado para el detalle de las pizzas
  const [infopizza, setInfoPizza] = useState({ ingredients: [] });
  // Trae todos los datos de pizzas id
  const [pizzas, setPizzas] = useState([]);
  const [token, setToken] = useState(true);

  // Calcular el total del carrito
  const calcularTotal = pizzasCarrito.reduce((total, pizza) => {
    return total + pizza.price * pizza.count;
  }, 0);

  // Efecto para hacer el fetch a la API de pizzas
  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas")
      .then((res) => res.json())
      .then((data) => {
        setInfo(data); // Guardamos los datos obtenidos de la API en el estado info
        console.log(data);
      })
      .catch((error) => console.error("Error fetching pizzas:", error)); // Manejo de errores
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez al cargar el componente

  // Efecto para hacer el fetch a la API de una Pizza
  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas/p001")
      .then((res) => res.json())
      .then((data) => {
        setInfoPizza({
          id: data.id,
          name: data.name,
          desc: data.desc,
          precio: data.price,
          img: data.img,
          ingredients: data.ingredients,
        });
      });
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pizzas");
        if (!res.ok) {
          throw new Error("Error al fetch las pizzas");
        }
        const data = await res.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // Pasamos todo lo necesario al contexto
  return (
    <CardContext.Provider
      value={{
        pizzasCarrito,
        setPizzasCarrito,
        calcularTotal,
        info,
        setInfo,
        infopizza,
        setInfoPizza,
        pizzas,
        setPizzas,
        token,
        setToken,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CounterProvider;
