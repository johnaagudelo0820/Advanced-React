import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import useForm from '../lib/useForm'

import DisplayError from './ErrorMessage'
import Form from './styles/Form'

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`

export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })
  // 1. We need to get the existing product
  // 2. we need to get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION)
  // 2.5 Create some state for the form inputs
  const { inputs, handlerChange } = useForm(data?.Product)
  if (loading) return <p>Loading...</p>
  if (error) return <DisplayError error={error} />

  // 3. We need the form
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()
        // console.log(inputs)
        const res = await updateProduct({
          variables: {
            id: inputs.id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        })
        // // submit the inputfields to the backend
        // const res = await createProduct({
        //   variables: inputs,
        // })
        // clearForm()
        // // go to that product's page
        // Router.push({
        //   pathname: `/product/${res.data.createProduct.id}`,
        // })
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name:
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handlerChange}
          />
        </label>
        <label htmlFor="price">
          Price:
          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handlerChange}
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handlerChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  )
}

UpdateProduct.propTypes = {
  id: PropTypes.string,
}
