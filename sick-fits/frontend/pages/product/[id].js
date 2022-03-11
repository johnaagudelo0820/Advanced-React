import SingleProduct from '../../components/SingleProduct'

export default function singleProduct({ query }) {
  return <SingleProduct id={query.id} />
}
