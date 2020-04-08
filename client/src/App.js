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
        debug: true,
        hasA11yNotifications: true,
        // selon https://www.elastic.co/fr/blog/how-to-build-great-react-search-experiences-quickly
        // ajout des principales configs
        searchQuery: {
          search_fields: {
            // 1. Recherche par nom de lieu
            title: {},
          },
          // 2. Résultats de la recherche : title, description, id, nps_link
          result_fields: {
            title: {
              // snippet = recherche qui match dans une balise <em> (surligné)
              snippet: {
                size: 120, // limite le nbr de caractères du snippet
                fallback: true,
              },
            },
            description: {
              snippet: {
                size: 200,
                fallback: true,
              },
            },
            id: {
              snippet: {
                size: 75,
                fallback: true,
              },
            },
            nps_link: {
              snippet: {
                size: 100,
                fallback: true,
              },
            },
          },
          // 3. recherche à facette par états, si patrimoine humanité, nbr de visiteurs
          facets: {
            states: {
              type: 'value',
              size: 5,
            },
            world_heritage_site: {
              type: 'value',
              size: 5,
            },
            visitors: {
              type: 'range',
              ranges: [
                { from: 0, to: 10000, name: 'Quasi nulle' },
                { from: 10001, to: 100000, name: 'Très faible' },
                { from: 100001, to: 500000, name: 'Faible' },
                { from: 500001, to: 1000000, name: 'Moyenne' },
                { from: 1000001, to: 5000000, name: 'Forte' },
                { from: 5000001, to: 10000000, name: 'Très forte' },
                { from: 10000001, name: 'Extrème' },
              ],
            },
          },
        },
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
