import Stripe from "stripe"
import Product from "./components/Product"

const getProducts = async() => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15"
  })
  const products = await stripe.products.list()

  // Fatches each of these prices based of the products ID
  // Promise says that when the "promise" is resolved, it will execute the function and have the data available for us
  const productWithPrice = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({product: product.id})
      const features = product.metadata.features || ''

      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: {features}
      }
    } )
  )
  return productWithPrice
}

export default async function Home() {
  
  const products = await getProducts()
  // console.log(products);

  return (
    <main>
      <div className="bg-teal-50 border-2 border-teal-400 px-4 py-2 rounded-lg mb-4">
        <h1 className="text-4xl font-bold text-teal-400 hover:translate-x-2 duration-500 ease-in-out">Courses</h1>
      </div>
      <div className="grid grid-cols-fluid gap-8 p-4 rounded-lg bg-gradient-to-b from-teal-400 to-teal-800">
        {products.map( (product) => (
          <Product
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </main>
  )
}
