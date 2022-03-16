import { useEffect, useState } from 'react'

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial)
  const initialState = Object.values(initial).join()

  useEffect(() => {
    setInputs(initial)
  }, [initialState])

  function handlerChange(e) {
    let { name, value, type } = e.target
    if (type === 'number') {
      value = parseInt(value)
    }
    if (type === 'file') {
      ;[value] = e.target.files
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  function resetForm() {
    setInputs(initial)
  }

  function clearForm() {
    const blackState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    )
    setInputs(blackState)
  }

  // return the things we wnat to surface from this custom hook
  return {
    inputs,
    handlerChange,
    resetForm,
    clearForm,
  }
}
