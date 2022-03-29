import Link from 'next/link'
import { useCart } from '../lib/cartState'
import CartCount from './CartCount'
import SignOut from './SignOut'

import NavStyles from './styles/NavStyles'
import { useUser } from './User'

export default function Nav() {
  const user = useUser()
  const { openCart } = useCart()
  return (
    <NavStyles>
      <Link href="/products">products</Link>
      {user && (
        <>
          <Link href="/sell">sell</Link>
          <Link href="/orders">orders</Link>
          <Link href="/account">account</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (tallly, cartItem) => tallly + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!user && <Link href="/signin">sign in</Link>}
    </NavStyles>
  )
}
