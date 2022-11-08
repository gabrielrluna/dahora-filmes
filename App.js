import { StatusBar, StyleSheet } from "react-native";

import Home from "./src/screens/Home.js";
import FormBusca from "./src/screens/FormBusca.js";
import Favoritos from "./src/screens/Favoritos.js";
import Sobre from "./src/screens/Sobre.js";
import Privacidade from "./src/screens/Privacidade.js";

const App = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Privacidade />
    </>
  );
};

export default App;

const estilos = StyleSheet.create({});
