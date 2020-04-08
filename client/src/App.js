import React from 'react';

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  WithSearch,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
} from '@elastic/react-search-ui';
import { Layout, SingleSelectFacet } from '@elastic/react-search-ui-views';
import '@elastic/react-search-ui-views/lib/styles/styles.css';

import connector from './elasticsearch-connector';

// const exampleData = {
//   description:
//     'The park protects a quarter of the Gunnison River, which slices sheer canyon walls from dark Precambrian-era rock. The canyon features some of the steepest cliffs and oldest rock in North America, and is a popular site for river rafting and rock climbing. The deep, narrow canyon is composed of gneiss and schist which appears black when in shadow.',
//   nps_link: 'https://www.nps.gov/blca/index.htm',
//   states: ['Colorado'],
//   title: 'Black Canyon of the Gunnison',
//   id: 'park_black-canyon-of-the-gunnison',
//   visitors: 238018,
//   world_heritage_site: false,
//   location: '38.57,-107.72',
//   acres: 30749.75,
//   square_km: 124.4,
//   date_established: '1999-10-21T05:00:00Z',
// };

const App = () => {
  return (
    <SearchProvider
      config={{
        ...connector,
        debug: process.env.NODE_ENV !== 'production' ? true : false,
        hasA11yNotifications: process.env.NODE_ENV !== 'production' ? true : false,
      }}
    >
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => (
          <div className="App">
            <ErrorBoundary>
              <Layout
                header={
                  <SearchBox
                    autocompleteMinimumCharacters={3}
                    autocompleteResults={{
                      linkTarget: '_blank',
                      sectionTitle: 'Results',
                      titleField: 'title',
                      urlField: 'nps_link',
                      shouldTrackClickThrough: true,
                      clickThroughTags: ['test'],
                    }}
                    autocompleteSuggestions={true}
                  />
                }
                sideContent={
                  <div>
                    {wasSearched && (
                      <Sorting
                        label={'Trier par'}
                        sortOptions={[
                          {
                            name: 'Pertinence',
                            value: '',
                            direction: '',
                          },
                          {
                            name: 'Titre',
                            value: 'title',
                            direction: 'asc',
                          },
                        ]}
                      />
                    )}
                    <Facet
                      field="states"
                      label="Etat"
                      filterType="any"
                      isFilterable={true}
                    />
                    <Facet
                      field="world_heritage_site"
                      label="Patrimoine de l'humanité ?"
                    />
                    <Facet
                      field="visitors"
                      label="Nb visiteurs"
                      filterType="any"
                    />
                    <Facet
                      field="acres"
                      label="Hectars"
                      view={SingleSelectFacet}
                    />
                  </div>
                }
                bodyContent={
                  <Results
                    titleField="title"
                    urlField="nps_link"
                    shouldTrackClickThrough={true}
                  />
                }
                bodyHeader={
                  <React.Fragment>
                    {wasSearched && <PagingInfo />}
                    {wasSearched && <ResultsPerPage />}
                  </React.Fragment>
                }
                bodyFooter={<Paging />}
              />
            </ErrorBoundary>
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  );
};

export default App;
