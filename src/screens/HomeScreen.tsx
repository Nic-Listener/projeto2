import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Movie {
  title: string;
  releaseYear: string;
  poster: string; // Adicionamos o poster aqui para armazenar a imagem.
}

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



  useEffect(() => {
    fetchMovies();
  }, []);
}

export default HomeScreen;
