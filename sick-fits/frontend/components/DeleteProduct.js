import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`

function update(cache, payload) {
  console.log(payload)
  console.log('function the update function after delete')
  cache.evict(cache.identify(payload.data.deleteProduct))
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update,
    }
  )
  return (
    <button
      type="button"
      onClick={() => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch((error) => alert(error.message))
        }
      }}
    >
      {children}
    </button>
  )
}

DeleteProduct.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
}
