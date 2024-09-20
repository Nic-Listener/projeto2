import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import MMKVStorage from 'react-native-mmkv-storage';
import Input from '../components/Imput';
import Button from '../components/Button';
import { GlobalStyles } from '../styles/Styles'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const MMKV = new MMKVStorage.Loader().initialize();

type CreateAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    try {
      // Verifica se o e-mail já está cadastrado
      const existingUser = MMKV.getString(email);
      if (existingUser) {
        Alert.alert('Erro', 'E-mail já cadastrado.');
        return;
      }

      // Armazena o e-mail e senha no MMKV
      MMKV.setString(email, password);
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
