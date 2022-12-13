import { useEffect, useState } from 'react';
import { ToDolistProvider } from '../context/ToDolistApp'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {

  return (
    <ToDolistProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </ToDolistProvider>
  )
};

export default MyApp
