import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

var suggestions;

async function getSearch(value) {
  const data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8d94e45c77ee4fca2cd5bdb5874aa8ed&language=en-US&query=${value}`);
  suggestions = data.data;
}

const getSuggestions = value => {

  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8d94e45c77ee4fca2cd5bdb5874aa8ed&language=en-US&query=${value}`)
    .then(res => {
      console.log(res.data);
      suggestions = res.data
    });
  console.log(suggestions);
  if(suggestions)
    return suggestions.results.slice(0,4);
  else
    return [];
}

const getSuggestionValue = suggestion => {
    console.log(suggestion);
  return suggestion.title;
}

const renderSuggestion = suggestion => {
  return (
  <div>
    {suggestion.title}
  </div>
  );
}

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      movie: '',
      value: '',
      suggestions: []
    }

  }

  onChange = (event, {newValue}) => {
    this.setState(
      {value: newValue}
    );
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.setState({ redirect: true, movie: suggestion });
  }

  renderRedirect = () => {
    if(this.state.redirect)
      return <Redirect to={`/movie/${this.state.movie.id}`} />
  }

  render() {

    const inputProps = {
      placeholder: "Search Movies",
      value: this.state.value,
      onChange:  this.onChange
    }

    const theme = {
      container:                'react-autosuggest__container',
      containerOpen:            'react-autosuggest__container--open',
      input:                    'input',
      inputOpen:                'react-autosuggest__input--open',
      inputFocused:             'react-autosuggest__input--focused',
      suggestionsContainer:     'menu',
      suggestionsContainerOpen: 'menu--open',
      suggestionsList:          'suggestion-list',
      suggestion:               'list-item',
      suggestionFirst:          'react-autosuggest__suggestion--first',
      suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
      sectionContainer:         'react-autosuggest__section-container',
      sectionContainerFirst:    'react-autosuggest__section-container--first',
      sectionTitle:             'react-autosuggest__section-title'
    }

    return (
      <div className="header">
        {this.renderRedirect()}
        <Autosuggest
          suggestions = {this.state.suggestions}
          onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
          onSuggestionSelected = {this.onSuggestionSelected}
          getSuggestionValue = {getSuggestionValue}
          renderSuggestion = {renderSuggestion}
          inputProps = {inputProps}
          theme = {theme}
        />
      </div>
      

    );
  }

}

export default SearchBar;
