import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  // FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

// import ItemSeparador from "../components/ItemSeparador";
// import ItemVazio from "../components/ItemVazio";
// import CardFilme from "../components/CardFilme";
import { Ionicons } from "@expo/vector-icons";

const Favoritos = () => {
  const [listaFavoritos, setListaFavoritos] = useState([]);
  useEffect(() => {
    async function carregarFavoritos() {
      try {
        const dados = await AsyncStorage.getItem("@favoritos");
        const filmes = JSON.parse(dados);
        if (dados != null) {
          setListaFavoritos(filmes);
        }
      } catch (error) {
        console.log("Deu ruim no carregamento: " + error.message);
      }
    }

    carregarFavoritos();
  }, []);

  const excluirFavoritos = async () => {
    await AsyncStorage.removeItem("@favoritos");
    setListaFavoritos([]);
    Alert.alert("Parabéns", "Favoritos excluidos");
  };

  return (
    <SafeAreaView style={estilos.safeContainer}>
      <View style={estilos.container}>
        <Text>Quantidade: {listaFavoritos.length} </Text>
        <Button title="Excluir Favoritos" onPress={excluirFavoritos} />

        {listaFavoritos.map((filmeFavorito) => {
          return (
            <Pressable key={filmeFavorito.id} style={estilos.itemFilme}>
              <Text> {filmeFavorito.title} </Text>
              <Pressable style={estilos.botaoExcluir}>
                <Ionicons name="trash" size={24} color="white" />
              </Pressable>
            </Pressable>
          );
          // <Text key={filmeFavorito.id}> {filmeFavorito.title}</Text>;
        })}

        {/* <FlatList
        ItemSeparatorComponent={ItemSeparador}
        ListEmptyComponent={ItemVazio}
        data={listaFavoritos}
        renderItem={({ item }) => {
          return <CardFilme filme={item} />;
        }}
        keyExtractor={(item) => item.id}
      /> */}
      </View>
    </SafeAreaView>
  );
};

export default Favoritos;

const estilos = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 8,
  },
  itemFilme: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ccc",
    marginVertical: 8,
    borderRadius: 4,
  },
  botaoExcluir: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 4,
  },
});
