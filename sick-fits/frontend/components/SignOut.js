import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { CURRENT_USE_QUERY } from './User'

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`

export default function SignOut({ children }) {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USE_QUERY }],
  })
  return (
    <button type="button" onClick={signout}>
      Sign Out
    </button>
  )
}

SignOut.propTypes = {
  children: PropTypes.node,
}
