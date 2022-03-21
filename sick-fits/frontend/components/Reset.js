import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'
import { CURRENT_USE_QUERY } from './User'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`

export default function Reset({ token }) {
  const { inputs, handlerChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  })

  const [reset, { data, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USE_QUERY }],
  })

  const handlerSubmit = async (event) => {
    event.preventDefault()
    const res = await reset().catch(console.error)
    console.log(res)
    resetForm()
  }

  const successfulError = data?.redeemUserPasswordReset?.code
    ? data?.redeemUserPasswordReset
    : undefined

  return (
    <Form method="POST" onSubmit={handlerSubmit}>
      <h2>Request Your Password</h2>
      <DisplayError error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! Tou can Now Sign In</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handlerChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handlerChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  )
}

Reset.propTypes = {
  token: PropTypes.string,
}
