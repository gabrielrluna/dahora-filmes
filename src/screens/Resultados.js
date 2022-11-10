import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";

const Resultados = ({ route }) => {
  /* Usamos a prop route (do ReactNavigation) para acessar os
   parâmetros desta rota de navegação e extrair os dados
  (neste caso, filme) enviados para esta tela "Resultados"*/
  const { filme } = route.params;
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await api.get("/search/movie", {
          params: {
            api_key: "29ac2e9d65353399c2013158554a5e6d",
            language: "pt-BR",
            query: filme,
            include_adult: false,
          },
        });
        setResultados(resposta.data.results);
      } catch (error) {
        console.log("Deu ruim na API: " + error.message);
      }
    }
    buscarFilmes();
  }, []);

  console.log(resultados);
  return (
    <SafeAreaView style={estilos.container}>
      <Text>Você buscou por: {filme}</Text>
      <View>
        {resultados.map((resultados) => {
          return <Text key={resultados.id}> {resultados.title}</Text>;
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
});
