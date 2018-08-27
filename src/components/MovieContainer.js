import MovieList from './MovieList';
import SearchBar from './SearchBar';
import React, { Component } from 'react';
import axios from 'axios';

class MovieContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upcoming: [],
      nowPlaying: [],
    }
    
    Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=8d94e45c77ee4fca2cd5bdb5874aa8ed`),
      axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=8d94e45c77ee4fca2cd5bdb5874aa8ed`)
    ])
    .then(([nowPlaying, upcoming]) => {
      this.setState({upcoming: upcoming.data.results.slice(0, 18), nowPlaying: nowPlaying.data.results.slice(0, 15)})
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <h1>Upcoming Movies</h1>
        <MovieList movies={this.state.upcoming} />
        <h1>Now Showing</h1>
        <MovieList movies={this.state.nowPlaying} />
      </div>
    );
  }
}





export default MovieContainer;
