import { useState, useEffect } from 'react'
import Link from "next/link"
import Image from 'next/image'

import useCartStore from "@/stores/cartStore"
import { formatCurrency } from '@/utils/formatCurrency' 

import { XMarkIcon } from '@heroicons/react/24/solid'

const ProductItem = ({ product }) => {
  const[quantity, setQuantity] = useState(0)
  /* STORE */
  const cart = useCartStore((state) => state.cart)
  const increaseCartQuantity = useCartStore((state) => state.increaseCartQuantity)
  const decreaseCartQuantity = useCartStore((state) => state.decreaseCartQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  useEffect(() => {
    const cartItemQty = cart.find(x => x.id === product.id)?.quantity || 0
    setQuantity(cartItemQty)
  }, [cart])

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
        <Link href={`/products/${product.slug}`}>
          <figure>
            <Image src={product.img} width={400} height={225} alt={product.name} className="rounded shadow" />
          </figure>
        </Link>
      
      <div className="card-body flex flex-col justify-center items-center p-5">
        <Link href={`/products/${product.slug}`}>
          <h2 className="card-title">{ product.name }</h2>
        </Link>

        <p className="mb-2">{ product.brand }</p>
        <p className='text-3xl font-semibold text-gray-500'>{ formatCurrency(product.price) }</p>
        <div className="card-actions w-full">
          { quantity === 0 ? (
              <div className="w-full flex justify-center">
                
              <button className="btn"
                onClick={() => increaseCartQuantity(product.id)}
                >Add to cart</button>
              </div>
            )
            : (
                <div className="w-full flex justify-between">

                  <div className='flex gap-2'>
                    {/* DECREASE */}
                    <button className="btn btn-square btn-outline"
                      onClick={() => decreaseCartQuantity(product.id)}
                    >
                      <span className="text-2xl">&#8722;</span>
                    </button>

                    {/* INCREASE */}
                    <button className="btn btn-square btn-outline"
                      onClick={() => increaseCartQuantity(product.id)}
                    >
                      <span className="text-2xl">&#43;</span>
                    </button>
                  </div>

                  {/* ITEMS IN CART */}
                  <div className="flex items-center">
                    <h5 className='text-sm'>Items in cart</h5>
                    <span className="bg-gray-600 text-white w-12 h-12 flex justify-center items-center rounded-lg ml-2">{ quantity }</span>
                  </div>

                  {/* DELETE BTN */}
                  <div className='flex flex-col items-center cursor-pointer'
                    onClick={() => removeFromCart(product.id)}
                  >
                    <XMarkIcon className='w-6 h-6 text-red-500 font-semibold mr-1' />
                    <span className='text-sm'>Remove</span>
                  </div>
                </div>
              )
            }
        </div>
      </div>
    </div>
  )
}

export default ProductItem