import React from 'react';
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 5,
  arrows: true,
};

const MovieList = (props) => {
  return (
    <Slider {...settings}>
      {props.movies.map(movie => (
        <div className="wrapper">
          <img className="list-item" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
          <div className="overlay">
          <Link to={`/movie/${movie.id}`}>
            <div className="list-item-description">
              <h3>{movie.title}</h3>
              {movie.overview.substring(0,140) + "... Read More"}
             </div>
           </Link>
           </div>
        </div>
        ))}
    </Slider>
  );
}

export default MovieList;
