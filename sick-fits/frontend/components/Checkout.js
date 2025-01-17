import { useMutation } from '@apollo/client'
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import gql from 'graphql-tag'
import { useRouter } from 'next/dist/client/router'
import nProgress from 'nprogress'
import { useState } from 'react'
import styled from 'styled-components'
import { useCart } from '../lib/cartState'

import SickButton from './styles/SickButton'
import { CURRENT_USE_QUERY } from './User'

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

function CheckoutForm() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { closeCart } = useCart()
  const [checkout, { data, error: graphqlError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USE_QUERY }],
    }
  )

  const handlerSubmit = async (e) => {
    // 1. Stop the form from submitting and turn the loader one
    e.preventDefault()
    setLoading(true)
    console.log('We gotta do some work..')
    // 2. Start the page transaction
    nProgress.start()
    // 3. Create the payment method via stripe  (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })
    console.log(paymentMethod, error)
    // 4. Handler any errors from stripe
    if (error) {
      setError(error)
      nProgress.done()
      return // stop he checkout from happening
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    })
    console.log('Finished to the order')
    console.log(order)
    // 6. Change the page to view the order
    router.push({
      pathname: '/order',
      query: {
        id: order.data.checkout.id,
      },
    })
    // 7. close the cart
    closeCart()
    // 8. turn the loader off
    setLoading(false)
    nProgress.done()
  }
  return (
    <CheckoutFormStyles onSubmit={handlerSubmit}>
      {error && <p style={{ fontSize: 20 }}>{error.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  )
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  )
}
