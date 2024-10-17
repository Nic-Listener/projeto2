import axios from 'axios';
import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

interface Media {
  title: string;
  releaseYear: string;
  poster: string; // Poster é sempre uma string agora
}

export const fetchMovies = async (): Promise<Media[]> => {
  try {
    const response = await axios.get('https://reactnative.dev/movies.json');
    const movieList = response.data.movies;

    // Adicionando os pôsteres para os filmes
    const updatedMovies = movieList.map((movie: Media) => {
      let poster = '';

      switch (movie.title) {
        case 'Star Wars':
          poster = "https://via.placeholder.com/150";
          break;
        case 'Back to the Future':
          poster = "https://via.placeholder.com/150";
          break;
        case 'The Matrix':
          poster = "https://via.placeholder.com/150";
          break;
        case 'Inception':
          poster = "https://via.placeholder.com/150";
          break;
        case 'Interstellar':
          poster = "https://via.placeholder.com/150";
          break;
        default:
          poster = "https://via.placeholder.com/150"; // Pôster padrão para filmes que não estão na lista.
      }

      return { ...movie, poster }; // Garantimos que o poster é sempre uma string.
    });

    return updatedMovies;
  } catch (error) {
    throw new Error('Erro ao buscar filmes');
  }
};

// Função para selecionar uma imagem da galeria
export const selectImageFromGallery = async () => {
  try {
    const options = {
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
