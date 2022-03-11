import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Router from 'next/router'

import useForm from '../lib/useForm'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import { ALL_PRODUCTS_QUERY } from './Products'

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in and what types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      description
      price
    }
  }
`

export default function CreateProduct() {
  const { inputs, handlerChange, clearForm } = useForm({
    image: '',
    name: 'john',
    price: 3409,
    description: 'These are the best shoes!',
  })

  const [createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [
        {
          query: ALL_PRODUCTS_QUERY,
        },
      ],
    }
  )

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()
        console.log(inputs)

        // submit the inputfields to the backend
        const res = await createProduct({
          variables: inputs,
        })
        clearForm()
        // go to that product's page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        })
      }}
    >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image:
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handlerChange}
          />
        </label>
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

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  )
}
