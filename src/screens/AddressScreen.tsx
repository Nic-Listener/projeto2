import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, TouchableHighlight } from 'react-native';
import axios from 'axios';
import Input from '../components/Imput';
import Button from '../components/Button';
import { GlobalStyles } from '../styles/DefaultStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type AddressScreenProps = NativeStackScreenProps<RootStackParamList, 'Address'>;

const AddressScreen: React.FC<AddressScreenProps> = ({ navigation }) => {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCepChange = async (enteredCep: string) => {
    if (enteredCep.length === 8) {
      setIsLoading(true); // Iniciar o loading
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Garantir o mínimo de 2 segundos de espera
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
      } finally {
        setIsLoading(false); // Finalizar o loading
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
      
      <TouchableHighlight
        onPress={handleConfirmAddress}
        underlayColor="#444"
        style={styles.button}
        disabled={isLoading} // Desabilitar o botão durante o loading
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Confirmar Endereço</Text>
          <>
          {isLoading &&(<ActivityIndicator style={styles.loadingIndicator} color="#fff" />)} {/* Exibir loading ao lado */}
          </>
        </View>
      </TouchableHighlight>

    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10, // Espaço entre o texto e o indicador
  },
  loadingIndicator: {
    marginLeft: 10, // Espaçamento entre o texto e o indicador
  },
});

export default AddressScreen;
