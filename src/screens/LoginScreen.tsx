import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native'; 
import { View, Text, Alert, StatusBar, ActivityIndicator, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Imput';
import Button from '../components/Button';
import { GlobalStyles } from '../styles/DefaultStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type CreateAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

const LoginScreen: React.FC = ({ navigation }:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword', { email });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    try {
      // Verifica se o usuário existe
      const storedPassword = await AsyncStorage.getItem(email);

      if (!storedPassword) {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
        return;
      }

      if (storedPassword !== password) {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
        return;
      }

      // Se o login for bem-sucedido, navega para a proxima tela
      navigation.navigate('Address');
    } catch (error) { console.log(error);
      Alert.alert('Erro', 'Erro ao fazer login.');
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        isPassword
      />
      <Button
        title="Entrar"
        backgroundColor="#000"
        textColor="#fff"
        onPress={handleLogin}
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={GlobalStyles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <Button
        title="Criar Conta"
        backgroundColor="#d3d3d3"
        textColor="#000"
        onPress={handleCreateAccount}
      />
    </View>
  );
};

export default LoginScreen;
