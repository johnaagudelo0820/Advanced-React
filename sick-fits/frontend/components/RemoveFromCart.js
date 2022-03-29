import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import styled from 'styled-components'

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem))
}

export default function RemoveFromCart({ id }) {
  const [deleteFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  })
  return (
    <BigButton
      disabled={loading}
      onClick={() =>
        deleteFromCart().catch((error) => {
          console.log(error)
        })
      }
      type="button"
      title="Remove this Item from Cart"
    >
      &times;
    </BigButton>
  )
}

RemoveFromCart.propTypes = {
  id: PropTypes.string,
}
