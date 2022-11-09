import { SafeAreaView, StyleSheet, Text, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FormBusca = () => {
  return (
    <SafeAreaView>
      <Text>Star Trek? O Poderoso Chefão? A Lagoa Azul?</Text>
      <Text>Localize um filme que você viu ou gostaria de ver</Text>
      <Pressable
        style={estilos.botao}
        // onPress={() => navigation.navigate("Home")}
      >
        <Text style={estilos.textoBotao}>
          <Ionicons name="search" size={16} color="white" />
          Procurar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default FormBusca;

const estilos = StyleSheet.create({
  botao: {
    backgroundColor: "#5451a6",
    textAlign: "center",
  },
  textoBotao: {
    textAlign: "center",
    color: "white",
  },
});
