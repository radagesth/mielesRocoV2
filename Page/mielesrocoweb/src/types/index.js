
export const createProduct = (id, name, price, image, description) => ({
  id,
  name,
  price,
  image,
  description
});

export const createCartItem = (product, quantity) => ({
  product,
  quantity
});