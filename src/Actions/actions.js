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

export const fetchAutocompleteResults = input => {
  return dispatch => {
    axios
      .get(`Sample.json`)
      .then(response => {
        let filteredArray = response?.data?.predictions.filter(obj=>{
          return obj?.description?.toLowerCase() == input?.toLowerCase();
    })
        if(filteredArray?.length > 0){
          dispatch(fetchAutocompleteResultsSuccess(filteredArray));
        }
        else{
          dispatch(fetchAutocompleteResultsSuccess([]));
        }
      })
      .catch(error => {
        dispatch(fetchAutocompleteResultsFailure(error.message));
      });
  };
};
