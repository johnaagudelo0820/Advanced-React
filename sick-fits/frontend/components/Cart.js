import styled from 'styled-components'
import PropTypes from 'prop-types'
import calcTotalPrice from '../lib/calcTotalPrice'
import formatMoney from '../lib/formatMoney'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import { useUser } from './User'
import { useCart } from '../lib/cartState'
import CloseButton from './styles/CloseButton'
import RemoveFromCart from './RemoveFromCart'
import Checkout from './Checkout'

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`

function CartItem({ cartItem }) {
  const { product } = cartItem
  if (!product) return null
  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}
          {' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)}
            {' each'}
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  )
}

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.string,
    quantity: PropTypes.number,
    product: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      photo: PropTypes.shape({
        image: PropTypes.shape({
          publicUrlTransformed: PropTypes.string,
        }),
      }),
    }),
  }),
}

export default function Cart() {
  const me = useUser()
  const { cartOpen, closeCart } = useCart()
  if (!me) return null
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  )
}
