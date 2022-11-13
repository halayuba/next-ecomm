import Link from "next/link"

import useCartStore from "@/stores/cartStore"
import { formatCurrency } from '@/utils/formatCurrency' 

const ProductItem = ({ product }) => {
  const increaseCartQuantity = useCartStore((state) => state.increaseCartQuantity)

  return (
    <div className="card">
      <Link href={`/products/${product.slug}`}>
        <img src={product.img} alt={product.name} className="rounded shadow" />
      </Link>
      
      <div className="flex flex-col justify-center items-center p-5">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-lg">{ product.name }</h2>
        </Link>

        <p className="mb-2">{ product.brand }</p>
        <p>{ formatCurrency(product.price) }</p>
        <button className="btn"
          onClick={() => increaseCartQuantity(id)}
        >Add to cart</button>
      </div>

    </div>
  )
}

export default ProductItem