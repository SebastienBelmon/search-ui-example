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

const App = () => {
  return (
    <SearchProvider
      config={{
        ...connector,
        debug: true,
        hasA11yNotifications: true,
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
