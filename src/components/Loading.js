import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View style={estilos.loading}>
      <ActivityIndicator size="large" color="#5451a6" />
    </View>
  );
};

export default Loading;

const estilos = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
  },
});
