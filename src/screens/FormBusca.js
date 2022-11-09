import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const FormBusca = () => {
  const [filme, setFilme] = useState("");
  const textoDigitado = (valor) => {
    setFilme(valor);
  };

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.texto}>
        Star Trek? O Poderoso Chefão? A Lagoa Azul?
      </Text>
      <Text style={estilos.texto}>
        Localize um filme que você viu ou gostaria de ver
      </Text>
      <View style={estilos.pesquisa}>
        <Ionicons name="film" size={60} color="black" />
        <TextInput
          style={estilos.input}
          onChangeText={textoDigitado}
          placeholder="Digite o nome do filme"
          // value={text}
        />
      </View>

      <Button color="#5451a6" title="Procurar" />
    </SafeAreaView>
  );
};

export default FormBusca;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  botao: {
    backgroundColor: "#5451a6",
    textAlign: "center",
    color: "black",
    width: "95%",
    alignContent: "center",
  },
  texto: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    margin: 12,
    width: "80%",
    borderWidth: 1,
    padding: 10,
  },
  pesquisa: {
    flexDirection: "row",
    alignContent: "space-between",
  },
});
