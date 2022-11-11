import { StyleSheet, Image, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import apiKey from "../../apiKey";
import api from "../services/api";
import Loading from "../components/Loading";

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
        setInterval(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.log("Deu ruim na API: " + error.message);
      }
    }
    buscarFilmes();
  }, []);

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={estilos.container}>
      <Text>Você buscou por: {filme}</Text>

      {loading && <Loading />}

      <View>
        {!loading &&
          resultados.map((resultados) => {
            return (
              <View key={resultados.id}>
                <Image
                  style={estilos.capa}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${resultados.poster_path}`,
                  }}
                />

                <Text>{resultados.title}</Text>
              </View>
            );
          })}
      </View>
    </SafeAreaView>
  );
};

export default Resultados;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  capa: {
    height: 150,
    width: 100,
    flexDirection: "row",
  },
});
