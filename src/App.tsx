import './App.css'
import {ApolloClient,InMemoryCache,ApolloProvider,HttpLink,from} from '@apollo/client'
import { onError} from '@apollo/client/link/error'
import CategoryDropdown from './components/CreateItemComponent';
import GetAllItemComponent from './components/GetAllItemComponent';
import DeleteItemComponent from './components/DeleteComponent';
import UpdateItemComponent from './components/UpdateComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateItemComponent from './components/CreateItemComponent';
import Navbar from './components/Navbar';
import CreateCategoryComponent from './components/CreateCategoryComponent';
import GetItemByName from './components/GetItemByName';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      alert(`Graaphql error: ${message}`)
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});
const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:3000/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {

  return (
 <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<GetAllItemComponent />} />
          <Route path="/get-by-name" element={<GetItemByName />} />
          <Route path="/create-item" element={<CreateItemComponent />} />
          <Route path="/update-item" element={<UpdateItemComponent />} />
          <Route path="/delete-item" element={<DeleteItemComponent />} />
          <Route path="/create-category" element={<CreateCategoryComponent />} />
        </Routes>
      </Router>
 </ApolloProvider>
  )
}

export default App
