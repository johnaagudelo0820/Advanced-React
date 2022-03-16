import UpdateProduct from '../components/UpdateProduct'

export default function updatePage({ query }) {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  )
}
