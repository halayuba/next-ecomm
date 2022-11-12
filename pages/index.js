import Layout from '@/components/shared/Layout'
import ProductCard from '@/components/cart/ProductCard'
import useCartStore from "@/stores/cartStore"

const CartPage = () => {
  const products = useCartStore((state) => state.products)

  return(
    <Layout title="Home Page">
      <h2 className='my-8 text-2xl flex justify-center text-indigo-500 font-semibold'>Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products && products.map(item => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </Layout>
  )
}
export default CartPage