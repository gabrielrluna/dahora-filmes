import { StatusBar, StyleSheet } from "react-native";

import Home from "./src/screens/Home.js";
import FormBusca from "./src/screens/FormBusca.js";
import Favoritos from "./src/screens/Favoritos.js";
import Sobre from "./src/screens/Sobre.js";

const App = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Sobre />
    </>
  );
};

export default App;

const estilos = StyleSheet.create({});
