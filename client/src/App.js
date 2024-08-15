import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

import Home from '../src/pages/Home';
import Animal from '../src/pages/Animal';
import SingleAnimal from '../src/pages/SingleAnimal';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import DogBreed from '../src/pages/DogBreeds';
import BreedDetails from '../src/pages/BreedDetails';
import VetSearch from '../src/pages/VetSearch';
import VetClinic from '../src/pages/VetClinic';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        
        <Routes>
          <Route path="/Animal" element={<Animal />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/SingleAnimal/:id" element={<SingleAnimal />} />
          <Route path="/" element={<Home />} />
          <Route path="/DogBreed" element={<DogBreed />} />
          <Route path="/breed/:id" element={<BreedDetails />} />
          <Route path="/VetSearch" element={<VetSearch />} />
          <Route path="/clinic/:placeId" element={<VetClinic />} />
        </Routes>
       <Footer />
      </Router>


    </ApolloProvider>
  );
}

export default App;

