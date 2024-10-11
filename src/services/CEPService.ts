import axios from 'axios';

export const fetchAddressByCep = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.erro) {
      throw new Error('CEP inválido.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
