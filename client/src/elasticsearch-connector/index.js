import buildRequest from './buildRequest';
import runRequest from './runRequest';
import buildState from './buildState';
import applyDisjunctiveFaceting from './applyDisjunctiveFaceting';

export default {
  onResultClick: () => {},
  onAutocompleteResultClick: () => {},
  onAutocomplete: async ({ searchTerm }) => {
    const requestBody = buildRequest({ searchTerm });
    const json = await runRequest(requestBody);
    const state = buildState(json);
    return {
      autocompletedResults: state.results,
    };
  },
  onSearch: async state => {
    const { resultsPerPage } = state;
    const requestBody = buildRequest(state);
    // Note that this could be optimized by running all of these requests
    // at the same time. Kept simple here for clarity.
    const responseJson = await runRequest(requestBody);
    const responseJsonWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(
      responseJson,
      state,
      ['visitors', 'states']
    );
    return buildState(responseJsonWithDisjunctiveFacetCounts, resultsPerPage);
  },
};
