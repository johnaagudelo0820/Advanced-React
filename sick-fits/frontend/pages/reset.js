import Reset from '../components/Reset'

export default function reset({ query }) {
  console.log(query)
  if (!query?.token) {
    return <p>Sorry you must supply a token</p>
  }
  return (
    <div>
      <Reset token={query.token} />
    </div>
  )
}
