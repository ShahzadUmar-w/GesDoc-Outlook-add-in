import React, { useEffect, useState } from 'react'
import RouterApp from './router/Routes'

const App = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Initialize Office.js
    Office.onReady(() => {
      console.log('Office is ready');
      // Check localStorage for username
      const username = localStorage.getItem('username');
      if (!username) {
        setShowModal(true); // Show modal if no username
      }
    });
  }, []);

  return (
    <RouterApp />
  )
}

export default App