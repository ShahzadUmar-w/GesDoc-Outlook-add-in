import React, { useEffect, useState } from 'react'
import RouterApp from './router/Routes'
import { UserProvider } from "./context/UserContext.jsx";

const App = () => {

  return (
    <UserProvider>
      <RouterApp />
    </UserProvider>
  )
}

export default App