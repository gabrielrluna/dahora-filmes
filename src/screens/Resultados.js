import { StyleSheet, FlatList, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import apiKey from "../../apiKey";
import api from "../services/api";
import Loading from "../components/Loading";
import CardFilme from "../components/CardFilme";
import ItemSeparador from "../components/ItemSeparador";
import ItemVazio from "../components/ItemVazio";

const Resultados = ({ route }) => {
  /* Usamos a prop route (do ReactNavigation) para acessar os
   parâmetros desta rota de navegação e extrair os dados
  (neste caso, filme) enviados para esta tela "Resultados"*/
  const { filme } = route.params;
  const [resultados, setResultados] = useState([]);

  const [loading, setLoading] = useState([true]);

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
        //   setLoading(false);
        // }, 3000);
        setLoading(false);
      } catch (error) {
        console.log("Deu ruim na API: " + error.message);
      }
    }
    buscarFilmes();
  }, []);

  // if (loading) return <Loading />;

  return (
    <SafeAreaView style={estilos.container}>
      <Text>
        Sua busca por <Text style={estilos.nome}>{filme}</Text> retornou os
        seguintes resultados:
      </Text>

      {loading && <Loading />}

      <View style={estilos.viewFilmes}>
        {!loading && (
          <FlatList
            // horizontal={true}
            data={resultados}
            ItemSeparatorComponent={ItemSeparador}
            ListEmptyComponent={ItemVazio}
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

  nome: {
    fontWeight: "bold",
  },
});
