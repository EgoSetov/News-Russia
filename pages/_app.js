import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header'
import NextNprogress from 'nextjs-progressbar';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { addProfileAC } from '../store/profileReducer';

function MyApp({ Component, pageProps, profile }) {

	return (
		<>
			<Provider store={store}>
				<Header />
				<Head>
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
					<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
					<title>Weather Russia</title>
				</Head>
				<div className="container">
					<Component {...pageProps} />
				</div>
				<NextNprogress />
			</Provider>
		</>
	)
}

export default MyApp
