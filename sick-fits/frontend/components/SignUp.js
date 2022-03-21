import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import Form from './styles/Form'
import { CURRENT_USE_QUERY } from './User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`

export default function SignUp() {
  const { inputs, handlerChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  })

  const [signup, { data, error }] = useMutation(SIGNUP_MUTATION, {
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
      <h2>Sign Up For an Account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go Head and Sign In!
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handlerChange}
          />
        </label>
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
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  )
}
