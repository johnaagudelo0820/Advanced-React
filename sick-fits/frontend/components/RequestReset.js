import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'
import { CURRENT_USE_QUERY } from './User'

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`

export default function RequestReset() {
  const { inputs, handlerChange, resetForm } = useForm({
    email: '',
  })

  const [signup, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USE_QUERY }],
  })

  const handlerSubmit = async (event) => {
    event.preventDefault()
    const res = await signup().catch(console.error)
    console.log(res)
    resetForm()
  }

  return (
    <Form method="POST" onSubmit={handlerSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
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
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  )
}
