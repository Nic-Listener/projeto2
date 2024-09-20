import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native'; 
import { View, Text, Alert } from 'react-native';
import MMKVStorage from 'react-native-mmkv-storage';
import Input from '../components/Imput';
import Button from '../components/Button';
import { GlobalStyles } from '../styles/Styles'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const MMKV = new MMKVStorage.Loader().initialize();

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    try {
      // Verifica se o usuário existe
      const storedPassword = MMKV.getString(email);

      if (!storedPassword) {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
        return;
      }

      if (storedPassword !== password) {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
        return;
      }

      // Se o login for bem-sucedido, navega para a tela principal
      navigation.navigate('Home');
    } catch (error) {
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
