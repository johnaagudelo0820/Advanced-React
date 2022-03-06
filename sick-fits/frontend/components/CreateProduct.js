import useForm from '../lib/useForm';

import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handlerChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'john',
    price: 3409,
    description: 'These are the best shoes!',
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset>
        <label htmlFor="image">
          Image:
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handlerChange}
          />
        </label>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handlerChange}
            disabled
          />
        </label>
        <label htmlFor="price">
          Price:
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handlerChange}
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handlerChange}
          />
        </label>

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
