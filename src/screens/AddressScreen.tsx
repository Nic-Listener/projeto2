import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import Input from '../components/Imput';
import Button from '../components/Button';
import { GlobalStyles } from '../styles/DefaultStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Definir os tipos de navegação
type AddressScreenProps = NativeStackScreenProps<RootStackParamList, 'Address'>;

const AddressScreen: React.FC<AddressScreenProps> = ({ navigation }) => {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const handleCepChange = async (enteredCep: string) => {
    if (enteredCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${enteredCep}/json/`);

        if (response.data.erro) {
          Alert.alert('Erro', 'CEP inválido.');
          return;
        }

        const { logradouro, bairro, localidade, uf } = response.data;
        setLogradouro(logradouro);
        setBairro(bairro);
        setCidade(localidade);
        setEstado(uf);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar o CEP.');
      }
    } else {
      setLogradouro('');
      setBairro('');
      setCidade('');
      setEstado('');
    }
  };

  const handleConfirmAddress = () => {
    if (!cep || !logradouro || !bairro || !cidade || !estado) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    Alert.alert('Sucesso', 'Endereço confirmado!');
    navigation.navigate('Home'); // Navegar para a tela Home
  };

  return (
    <View style={GlobalStyles.container}>
      <Input
        placeholder="Digite seu CEP"
        value={cep}
        onChangeText={(text) => {
          setCep(text);
          handleCepChange(text);
        }}
        keyboardType="numeric"
        maxLength={8}
      />
      <Input
        placeholder="Logradouro"
        value={logradouro}
        editable={false}
      />
      <Input
        placeholder="Bairro"
        value={bairro}
        editable={false}
      />
      <Input
        placeholder="Cidade"
        value={cidade}
        editable={false}
      />
      <Input
        placeholder="Estado"
        value={estado}
        editable={false}
      />
      <Button
        title="Confirmar Endereço"
        backgroundColor="#000"
        textColor="#fff"
        onPress={handleConfirmAddress} // Função de confirmação
      />
    </View>
  );
};

export default AddressScreen;
