import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import MMKVStorage from 'react-native-mmkv-storage';
import Input from '../components/Imput';
import Button from '../components/Button';
import { GlobalStyles } from '../styles/Styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const MMKV = new MMKVStorage.Loader().initialize(); // Inicializa o MMKV

type ForgotPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.email]);

  const handleSend = async () => {
    if (!email || !newPassword || !confirmPassword) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      // Verifica se o e-mail existe
      const existingUser = MMKV.getString(email);
      if (!existingUser) {
        Alert.alert('Erro', 'E-mail não encontrado.');
        return;
      }

      // Atualiza a senha
      MMKV.setString(email, newPassword);
      Alert.alert('Sucesso', 'Senha alterada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao alterar a senha.');
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
        editable={false}
      />
      <Input
        placeholder="Nova senha"
        value={newPassword}
        onChangeText={setNewPassword}
        isPassword
      />
      <Input
        placeholder="Confirmar nova senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        isPassword
      />
      <Button
        title="Enviar"
        backgroundColor="#000"
        textColor="#fff"
        onPress={handleSend}
      />
    </View>
  );
};

export default ForgotPasswordScreen;
