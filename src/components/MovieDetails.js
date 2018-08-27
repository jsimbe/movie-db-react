import React,{Component} from 'react'
import axios from 'axios'

class MovieDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movie: '',
      trailers: [{}]
    }
  }

  componentDidMount() {
    const {params} = this.props.match;
    Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=8d94e45c77ee4fca2cd5bdb5874aa8ed`),
      axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=8d94e45c77ee4fca2cd5bdb5874aa8ed`)
    ])
    .then(([movies,trailers]) => {
      this.setState({movie: movies.data, trailers: trailers.data.results})
    });

  }

  render() {
    if(this.state.movie && this.state.trailers)
    {
      return (
        <div className="container">
          <h1>{this.state.movie.title}</h1>
          <div className="row">
            <div className="col-md-4">
              <img src={`https://image.tmdb.org/t/p/w342/${this.state.movie.poster_path}`} />
            </div>
            <div className="col-md-6 details">
              <h3>Synopsis: </h3>
              <div className="synopsis">
                {this.state.movie.overview}
              </div>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={`https://youtube.com/embed/${this.state.trailers[0].key}`} allowFullScreen />
              </div>
            </div>
          </div>
        </div>

          );
    }
    else
      return (<h1>Loading</h1>);
  }
}


export default MovieDetails;
