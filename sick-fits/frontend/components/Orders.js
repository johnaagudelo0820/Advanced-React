import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link'
import styled from 'styled-components'
import Head from 'next/head'
import DisplayError from './ErrorMessage'
import formatMoney from '../lib/formatMoney'

import OrderItemStyles from './styles/OrderItemStyles'

const USER_ORDERS_QUERY = gql`
  query {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`

const OrderURL = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`

function countItemsInAndOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0)
}

export default function Orders() {
  const { loading, error, data } = useQuery(USER_ORDERS_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <DisplayError error={error} />
  const { allOrders } = data
  console.log(allOrders)
  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderURL>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>
                    {countItemsInAndOrder(order)} Item
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>
                    {order.items.length} product
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo.image.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderURL>
    </div>
  )
}
