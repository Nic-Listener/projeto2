import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchMovies, selectImageFromGallery } from '../services/movieService';

interface Movie {
  id: number;
  title: string;
  releaseYear: string;
  poster: string;
}

const HomeScreen: React.FC = (navigation):any => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [starWarsPoster, setStarWarsPoster] = useState<string>(''); // Estado para o novo pôster de Star Wars



  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieData: Movie[] = await fetchMovies();
        setMovies(movieData);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  // Função para substituir o pôster de Star Wars
  const handleSelectImage = async () => {
    const newPosterUri = await selectImageFromGallery();
    if (newPosterUri) {
      setStarWarsPoster(newPosterUri);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

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
    //padding: 10,
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
