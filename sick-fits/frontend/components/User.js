import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

export const CURRENT_USE_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            name
            description
            price
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`

export function useUser() {
  const { data } = useQuery(CURRENT_USE_QUERY)
  return data?.authenticatedItem
}
