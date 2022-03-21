import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'
import { CURRENT_USE_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`

export default function SignIn() {
  const { inputs, handlerChange, resetForm } = useForm({
    email: '',
    password: '',
  })
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USE_QUERY }],
  })

  const handlerSubmit = async (event) => {
    event.preventDefault()
    const res = await signin()
    console.log(res)
    resetForm()
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined

  return (
    <Form method="POST" onSubmit={handlerSubmit}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={error} />
      <fieldset>
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
          password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handlerChange}
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  )
}
