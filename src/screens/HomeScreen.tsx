import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface Movie {
  title: string;
  releaseYear: string;
  poster: string; // Adicionamos o poster aqui para armazenar a imagem.
}

const HomeScreen: React.FC = (navigation):any => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar filmes e adicionar os posters
  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://reactnative.dev/movies.json');
      const movieList = response.data.movies;

      // Adicionando os pôsteres para os filmes
      const updatedMovies = movieList.map((movie: Movie) => {
        let poster = '';

        switch (movie.title) {
          case 'Star Wars':
            poster = "https://i.etsystatic.com/23402008/r/il/86eb07/2374193445/il_570xN.2374193445_1y0k.jpg";
            break;
          case 'Back to the Future':
            poster = "https://www.posters.de/media/catalog/product/cache/cb3faf85ecb1e071fdba48f981c86454/p/y/py_pp0830_3.jpg";
            break;
          case 'The Matrix':
            poster = "https://www.coverwhiz.com/uploads/movies/the-matrix.jpg";
            break;
          case 'Inception':
            poster = "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg";
            break;
          case 'Interstellar':
            poster = "https://i.pinimg.com/originals/e4/bb/76/e4bb7637935f94a99746ada39277a54a.jpg";
            break;
          default:
            poster = "https://via.placeholder.com/150"; // Pôster padrão para filmes que não estão na lista.
        }

        return { ...movie, poster }; // Adicionando o poster ao objeto movie.
      });

      setMovies(updatedMovies);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.poster }} style={styles.poster} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.releaseYear}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: '#f2f2f2',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    //borderRadius: 10,
    padding: 10,
    //marginBottom: 10,
    alignItems: 'center',
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.8,
    //shadowRadius: 2,
    elevation: 5,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default HomeScreen;
