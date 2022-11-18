import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";
import apiKey from "../../apiKey";
import Loading from "../components/Loading";
import CardFilme from "../components/CardFilme";
import ItemSeparador from "../components/ItemSeparador";
import ItemVazio from "../components/ItemVazio";

const Resultados = ({ route }) => {
  const { filme } = route.params;

  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await api.get("/search/movie", {
          params: {
            api_key: apiKey,
            language: "pt-BR",
            query: filme,
            include_adult: false,
          },
        });

        setResultados(resposta.data.results);

        // setInterval(() => {
        setLoading(false);
        // }, 3000);
      } catch (error) {
        console.log("Deu ruim na busca na API: " + error.message);
      }
    }
    buscarFilmes();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <Text>Você buscou por: {filme} </Text>
      {loading && <Loading />}

      <View style={estilos.viewFilmes}>
        {!loading && (
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparador}
            ListEmptyComponent={ItemVazio}
            data={resultados}
            renderItem={({ item }) => {
              return <CardFilme filme={item} />;
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Resultados;

const estilos = StyleSheet.create({
  viewFilmes: {
    marginVertical: 8,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
