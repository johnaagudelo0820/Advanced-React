import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const LocalStateContext = createContext()
const LocalStateProvider = LocalStateContext.Provider

function CartStateProvider({ children }) {
  // this our own custom provider! we will store store data (state) and functionality (updaters) in here and anyone can access it via the consumer
  const [cartOpen, setCartOpen] = useState(false)

  function togglecart() {
    setCartOpen(!cartOpen)
  }

  function closeCart() {
    setCartOpen(false)
  }

  function openCart() {
    setCartOpen(true)
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, togglecart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  )
}

CartStateProvider.propTypes = {
  children: PropTypes.node,
}

// make a custom hook for accessing the cart local state
function useCart() {
  // We use a consumer here to access the local state
  const all = useContext(LocalStateContext)
  return all
}

export { CartStateProvider, useCart }
