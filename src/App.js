import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MovieContainer from './components/MovieContainer';
import MovieDetails from './components/MovieDetails';
import SearchBar from './components/SearchBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      upcoming: [],
      nowPlaying: [],
      movies: []
    }
  }


  searchHandler(term) {
    if(term)
    {
      axios.get(`https://api.themoviedb.org/3/search/movie?include_adult=false&api_key=8d94e45c77ee4fca2cd5bdb5874aa8ed&query=${term}`)
        .then(res => {
          const movies = res.data;
          this.setState({movies: movies.results});
        })
    }
    else
      this.setState({movies: []});
  }

  componentDidMount() {
    Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=8d94e45c77ee4fca2cd5bdb5874aa8ed`),
      axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=8d94e45c77ee4fca2cd5bdb5874aa8ed`)
    ])
    .then(([nowPlaying, upcoming]) => {
      this.setState({upcoming: upcoming.data.results.slice(0,18), nowPlaying: nowPlaying.data.results.slice(0,15)})
    });
    console.log(this.state.nowPlaying);
  }

  render() {
    return (
      <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MovieContainer} />
          <Route path="/movie/:id" component={MovieDetails} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
