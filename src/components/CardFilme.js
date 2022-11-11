import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";

const CardFilme = ({ filme }) => {
  const { title, poster_path } = filme;

  return (
    <View>
      <Image
        style={estilos.imagem}
        source={{
          uri: `https://image.tmdb.org/t/p/original/${poster_path}`,
        }}
      />

      <Text style={estilos.titulo}>{title}</Text>
    </View>
  );
};

export default CardFilme;

const estilos = StyleSheet.create({
  imagem: {
    height: 125,
  },
  titulo: {
    textAlign: "center",
  },
});
