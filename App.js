import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, StyleSheet } from "react-native";

import Home from "./src/screens/Home.js";
import FormBusca from "./src/screens/FormBusca.js";
import Favoritos from "./src/screens/Favoritos.js";
import Sobre from "./src/screens/Sobre.js";
import Privacidade from "./src/screens/Privacidade.js";
import Resultados from "./src/screens/Resultados.js";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#5451a6",
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            component={Home}
            name="Home"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={FormBusca}
            name="FormBusca"
            options={{ title: "Buscar filmes" }}
          />
          <Stack.Screen
            component={Favoritos}
            name="Favoritos"
            options={{ title: "Favoritos" }}
          />
          <Stack.Screen
            component={Sobre}
            name="Sobre"
            options={{ title: "Sobre" }}
          />
          <Stack.Screen
            component={Privacidade}
            name="Privacidade"
            options={{ title: "Privacidade" }}
          />
          <Stack.Screen
            component={Resultados}
            name="Resultados"
            options={{ title: "Resultados" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

const estilos = StyleSheet.create({});
