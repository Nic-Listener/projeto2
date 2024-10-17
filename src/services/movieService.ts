import axios from 'axios';
import { Alert } from 'react-native';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';

interface Media {
  title: string;
  releaseYear: string;
  poster: string; // Poster é sempre uma string agora
}

export const fetchMovies = async (): Promise<Media[]> => {
  try {
    const response = await axios.get('https://reactnative.dev/movies.json');
    const placeholder = 'https://via.placeholder.com/150';
    const movieList = response.data.movies;

    // Processando a lista para incluir o placeholder no pôster
    const updatedMovies = movieList.map((movie: any) => ({
      title: movie.title,
      releaseYear: movie.releaseYear,
      poster: placeholder, // Sempre o placeholder para o pôster
    }));

    return updatedMovies;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    throw error;
  }
};

// Função para selecionar uma imagem da galeria
export const selectImageFromGallery = async () => {
  try {
    const options:ImageLibraryOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      console.log('Usuário cancelou a seleção de imagem');
    } else if (result.errorMessage) {
      Alert.alert('Erro', result.errorMessage);
    } else {
      const selectedImageUri = result.assets ? result.assets[0].uri : '';
      return selectedImageUri; // Retorna o URI da imagem selecionada
    }
  } catch (error) {
    Alert.alert('Erro', 'Ocorreu um erro ao selecionar a imagem');
  }
};
