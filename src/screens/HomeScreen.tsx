import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchMovies, selectImageFromGallery } from '../services/movieService';

interface Media {
  title: string;
  releaseYear: string;
  poster: string;
}

const HomeScreen: React.FC = () => {
  const [movies, setMovies] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [GaleryPoster, setGaleryPoster] = useState<string>(''); // Estado para o novo pôster da galeria

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieData: Media[] = await fetchMovies();
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

    // Função para substituir o pôster de Galeria
    const handleSelectImage = async () => {
      const newPosterUri = await selectImageFromGallery();
      if (newPosterUri) {
        setGaleryPoster(newPosterUri);
      }
    };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderItem = ({ item }: { item: Media }) => (
    <View style={styles.card}>
      {/* Se o filme for Star Wars, exibe o botão para trocar o pôster */}
      {item.title === 'Star Wars' ? (
        <TouchableOpacity onPress={handleSelectImage}>
          <View>
            <Image
              source={{ uri: GaleryPoster || item.poster }}
              style={styles.poster}
              resizeMode="cover"
            />
            <Button title="Trocar" onPress={handleSelectImage} />
          </View>
        </TouchableOpacity>
      ) : (
        <Image source={{ uri: item.poster }} style={styles.poster} resizeMode="cover" />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.releaseYear}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.toString()} // Chave única para cada item
      renderItem={renderItem}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  poster: {
    width: 100,
    height: 150,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#777',
  },
});
