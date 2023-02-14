import axios from 'axios';

//Used if Real Api call exists
const fetchAutocompleteResultsRequest = () => {
  return {
    type: 'FETCH_AUTOCOMPLETE_RESULTS_REQUEST'
  };
};

const fetchAutocompleteResultsSuccess = results => {
  console.log('SUCCCESS');
  return {
    type: 'FETCH_AUTOCOMPLETE_RESULTS_SUCCESS',
    payload: results
  };
};

const fetchAutocompleteResultsFailure = error => {
  return {
    type: 'FETCH_AUTOCOMPLETE_RESULTS_FAILURE',
    payload: error
  };
};

//Action creator with Redux Thunk
export const fetchAutocompleteResults = input => {
  return (dispatch,getState) => {
    axios
      .get(`Sample.json`)
      .then(response => {
        let refinedCountries = response?.data?.predictions.filter(obj=>{
          return obj?.description?.toLowerCase() == input?.toLowerCase();
    })
        if(refinedCountries?.length > 0){
          dispatch(fetchAutocompleteResultsSuccess(refinedCountries));
        }
        else{
          dispatch(fetchAutocompleteResultsSuccess([]));
        }
      })
      .catch(error => {
        dispatch(fetchAutocompleteResultsFailure(error?.message));
      });
  };
};
