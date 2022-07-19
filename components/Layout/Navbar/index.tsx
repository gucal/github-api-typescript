import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import AuthContext from '../../../context/AuthenticationContext/store'
import NavbarArea, { NavbarEndArea, NavbarItem, NavbarStartArea } from './style'
import UserContext from '../../../context/UserContext/store'

function Navbar() {
  const { state, dispatch } = useContext(AuthContext)
  const userContextDispatch = useContext(UserContext).dispatch
  const router = useRouter()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    userContextDispatch({ type: 'RESET' })
    router.push('/login')
  }

  return (
    <NavbarArea>
      <NavbarStartArea>
        <Link href={'/'} passHref>
          <NavbarItem>Homepage</NavbarItem>
        </Link>
        <Link href={'/contact'} passHref>
          <NavbarItem>Contact</NavbarItem>
        </Link>
      </NavbarStartArea>
      <NavbarEndArea>
        {state.isLogin ? (
          <NavbarItem onClick={logout}>Logout</NavbarItem>
        ) : (
          <Link href={'/login'} passHref>
            <NavbarItem>Login</NavbarItem>
          </Link>
        )}
      </NavbarEndArea>
    </NavbarArea>
  )
}

export default Navbar
