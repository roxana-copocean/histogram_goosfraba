import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css';
import App from './App';
import config from './config';

const client = new ApolloClient({
	uri: config.endpoint,
	cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
