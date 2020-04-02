import React, { useEffect } from 'react';

import { SearchProvider, Results, SearchBox } from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';

import '@elastic/react-search-ui-views/lib/styles/styles.css';

import runRequest from './elasticsearch-connector/runRequest';

//TODO
const connector = {
  onResultClick: () => {
    /* Not implemented */
  },
  onAutocompleteResultClick: () => {
    /* Not implemented */
  },
  onAutocomplete: async ({ searchTerm }) => {
    // const requestBody = buildRequest({ searchTerm });
    // const json = await runRequest(requestBody);
    // const state = buildState(json);
    // return {
    //   autocompletedResults: state.results
    // };
  },
  onSearch: async state => {
    // const { resultsPerPage } = state;
    // const requestBody = buildRequest(state);
    // // Note that this could be optimized by running all of these requests
    // // at the same time. Kept simple here for clarity.
    // const responseJson = await runRequest(requestBody);
    // const responseJsonWithDisjunctiveFacetCounts = await applyDisjunctiveFaceting(
    //   responseJson,
    //   state,
    //   ["visitors", "states"]
    // );
    // return buildState(responseJsonWithDisjunctiveFacetCounts, resultsPerPage);
  },
};

const App = () => {
  useEffect(() => {
    const myAsync = async () => {
      const res = await runRequest();
      console.log(res);
      return res;
    };
    myAsync();
  }, []);
  return (
    <SearchProvider
      config={{
        ...connector,
        debug: true,
        hasA11yNotifications: true,
      }}
    >
      <div className="App">
        <Layout
          header={<SearchBox />}
          bodyContent={<Results titleField="title" />}
        />
      </div>
    </SearchProvider>
  );
};

export default App;
