import React from 'react';

import { SearchProvider, Results, SearchBox } from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';

import '@elastic/react-search-ui-views/lib/styles/styles.css';

//TODO
// const connector = {}

const App = () => {
  return (
    <SearchProvider
      config={{}}
    >
      <div className="App">
        <Layout
          header={<SearchBox />}
          bodyContent={<Results titleField="title" />}
        />
      </div>
    </SearchProvider>
  );
}

export default App;
