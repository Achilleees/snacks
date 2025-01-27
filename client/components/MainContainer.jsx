import React, { useEffect, useState } from "react";
import NavBar from './NavBar.jsx'
import { useLoggedInContext, useSetLoggedInContext } from './SnackContext.jsx'
import SnackBoxContainer from './SnackBoxContainer.jsx'

export default function MainPage() {
  const loggedIn = useLoggedInContext()
  const setLoggedIn = useSetLoggedInContext()
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  useEffect(() => {
    fetch('/user/verifySession')
      .then(data => data.json())
      .then(data => {
        if (data.status) setLoggedIn(true);
      })
  }, [])

  let string = loggedIn ? 'true' : 'false';
  
  console.log(loginModalIsOpen)
  return(
    <div>
      <NavBar setLoginModal={setLoginModalIsOpen} modalIsOpen={loginModalIsOpen}/>
      <SnackBoxContainer setLoginModal={setLoginModalIsOpen}/>
    </div>
    
  )
}