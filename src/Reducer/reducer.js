const initialState = {
    autocompleteResults: [],
    loading: false,
    error: null
  };
  
  const autocompleteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_AUTOCOMPLETE_RESULTS_REQUEST':
        return {
          ...state,
          loading: true
        };
      case 'FETCH_AUTOCOMPLETE_RESULTS_SUCCESS':
        return {
          ...state,
          autocompleteResults: action.payload,
          loading: false
        };
      case 'FETCH_AUTOCOMPLETE_RESULTS_FAILURE':
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      default:
        return state;
    }
  };
  
  export default autocompleteReducer;
  