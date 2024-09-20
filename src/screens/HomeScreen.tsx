import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../styles/DefaultStyles';

const HomeScreen: React.FC = () => {
  return (
    <View style={GlobalStyles.container}>
      <Text style={styles.text}>Bem-vindo à Tela Principal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
