import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';
import Input from '../components/Imput';
import Button from '../components/Button';
import { GlobalStyles } from '../styles/styles';

const CEPCheckScreen: React.FC = () => {
  const [cep, setCep] = useState('');
  const [addressData, setAddressData] = useState<any | null>(null);

  const handleCheckCEP = async () => {
    if (!cep || cep.length !== 8) {
      Alert.alert('Erro', 'Por favor, insira um CEP válido com 8 dígitos.');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        return;
      }
      setAddressData(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao consultar o CEP.');
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Input
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      <Button
        title="Consultar CEP"
        backgroundColor="#000"
        textColor="#fff"
        onPress={handleCheckCEP}
      />
      {addressData && (
        <View style={{ marginTop: 20 }}>
          <Text>Rua: {addressData.logradouro}</Text>
          <Text>Bairro: {addressData.bairro}</Text>
          <Text>Cidade: {addressData.localidade}</Text>
          <Text>Estado: {addressData.uf}</Text>
        </View>
      )}
    </View>
  );
};

export default CEPCheckScreen;
