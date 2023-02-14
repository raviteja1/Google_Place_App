import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAutocompleteResults } from '../Actions/actions';
import TextField from '@mui/material/TextField';
import './Autocomplete.css';

class Autocomplete extends Component {
  state = {
    input: ''
  };

  handleChange = event => {
    this.setState({ input: event.target.value });
    this.props.fetchAutocompleteResults(event.target.value);
  };

  componentDidUpdate(prevProps, prevState) {
    const { input } = this.state;
    if (prevState?.input !== input) {
      this.setState({ input });
    }
  }

  render() {
    const { autocompleteResults, loading, error } = this.props;
    return (
      <div>
        <div className='auto-complete-section' style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
          <label className='label-styles'>Map Location</label>
          <TextField id="exampleInput" label="Enter Location" className='text-field-styles' variant="outlined" onChange={this.handleChange} />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {autocompleteResults?.length > 0 ? (
          <table style={{ fontStyle: 'italic' }}>
            <tr>
              <th>Selected Location</th>
            </tr>{autocompleteResults?.map(result => (
              <tr>
                <td>{result?.description}</td>
              </tr>
            ))}
          </table>
        ) : <span className='error-msg-styles'>No Location Found</span>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    autocompleteResults: state.autocompleteResults,
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = {
  fetchAutocompleteResults
};

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);