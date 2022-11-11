import { StyleSheet, View } from "react-native";
import React from "react";

const ItemSeparador = () => {
  return (
    <View style={estilos.separador}>
      <View style={estilos.linha}></View>
    </View>
  );
};

export default ItemSeparador;

const estilos = StyleSheet.create({
  separador: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  linha: {
    backgroundColor: "black",
    height: 2,
    width: "80%",
  },
});
