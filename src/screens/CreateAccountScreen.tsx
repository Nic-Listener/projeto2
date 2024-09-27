import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Imput';
import Button from '../components/Button';
import { GlobalStyles } from '../styles/DefaultStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CreateAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

const CreateAccountScreen: React.FC = ({ navigation }:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    try {
      // Verifica se o e-mail já está cadastrado
      const existingUser = await AsyncStorage.getItem(email);
      if (existingUser) {
        Alert.alert('Erro', 'E-mail já cadastrado.');
        return;
      }

      // Armazena o e-mail e senha no AsyncStorage
      await AsyncStorage.setItem(email, password);
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar conta.');
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Input
        placeholder="Digite seu E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Crie sua Senha"
        value={password}
        onChangeText={setPassword}
        isPassword
      />
      <Button
        title="Enviar"
        backgroundColor="#000"
        textColor="#fff"
        onPress={handleCreateAccount}
      />
    </View>
  );
};

export default CreateAccountScreen;
