import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  // FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

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

  const navigation = useNavigation();

  const verDetalhes = (filmeSelecionado) => {
    navigation.navigate("Detalhes", { filme: filmeSelecionado });
  };

  const excluirFavoritos = async () => {
    Alert.alert(
      "Excluir TODOS?",
      "Tem certeza que deseja excluir TODOS os favoritos?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return false;
          },
          style: "cancel", // SOMENTE NO iOS
        },
        {
          text: "Sim, to nem aí",
          onPress: async () => {
            await AsyncStorage.removeItem("@favoritos");
            setListaFavoritos([]);
          },
          style: "destructive", // SOMENTE NO iOS
        },
      ]
    );
  };

  const excluirUmFavorito = async (indice) => {
    // Alert.alert(`Excluir filme no índice: ${indice}`);

    // Etapas para a exclusão do filme escolhido

    // 1) Conhecendo o índice, remover o elemento (filme do array "listaFavoritos")
    listaFavoritos.splice(indice, 1);
    /* SPLICE: Indicamos o índice de referência (na prática, o índice do
      filme que queremos remover e, a partir deste índice, a quantidade de
      elementos que queremos remover. Como aqui queremos apagar somente o
      próprio filme escolhido, passamos "1".*/

    // 2) Atualizar o storage com a lista atualizada (ou seja, sem o filme)
    // Obs: Transformar em String antes de gravar no storage
    await AsyncStorage.setItem("@favoritos", JSON.stringify(listaFavoritos));

    // 3) Recarregar do storage a nova lista de favoritos
    // Obs: Necessário transformar em Array/objetos antes de manipular na aplicação
    const listaDeFilmes = JSON.parse(await AsyncStorage.getItem("@favoritos"));

    // 4) Atualizar o state para um novo render na tela com a lista de favoritos
    setListaFavoritos(listaDeFilmes);

    //
  };

  return (
    <SafeAreaView style={estilos.safeContainer}>
      <View style={estilos.container}>
        <View style={estilos.cabecalho}>
          <Text>Quantidade: {listaFavoritos.length} </Text>
          <Pressable
            style={estilos.botaoExcluirTudo}
            onPress={excluirFavoritos}
          >
            <Text style={estilos.textoExcluirTudo}>
              <Ionicons name="trash-outline" size={16} />
              Excluir Favoritos
            </Text>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {listaFavoritos.map((filmeFavorito, indice) => {
            return (
              <Pressable
                onPress={() => verDetalhes(filmeFavorito)}
                key={filmeFavorito.id}
                style={estilos.itemFilme}
              >
                <Text style={estilos.titulo}>{filmeFavorito.title}</Text>
                <Pressable
                  style={estilos.botaoExcluir}
                  // onPress={excluirUmFavorito}
                  onPress={() => excluirUmFavorito(indice)}
                  // onPress={excluirUmFavorito.bind(this, indice)}
                >
                  <Ionicons name="trash" size={24} color="white" />
                </Pressable>
              </Pressable>
            );
            // <Text key={filmeFavorito.id}> {filmeFavorito.title}</Text>;
          })}
        </ScrollView>
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
    backgroundColor: "white",
  },
  itemFilme: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EEE8FC",
    marginVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  botaoExcluir: {
    backgroundColor: "#C0392B",
    padding: 8,
    borderRadius: 4,
  },
  cabecalho: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  botaoExcluirTudo: {
    borderWidth: 1,
    borderColor: "#C0392B",
    padding: 8,
    borderRadius: 4,
  },
  textoExcluirTudo: {
    color: "#C0392B",
  },
  titulo: {
    flex: 1,
    fontSize: 14,
  },
});
