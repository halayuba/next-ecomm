import { useState, useEffect } from 'react'
import Image from 'next/image'

import useCartStore from "@/stores/cartStore"
import {formatCurrency} from '@/utils/formatCurrency'

import { XMarkIcon } from '@heroicons/react/24/solid'

const ProductCard = ({id, title, price, imgUrl}) => {
  const[quantity, setQuantity] = useState(0)
  /* STORE */
  const cart = useCartStore((state) => state.cart)
  const increaseCartQuantity = useCartStore((state) => state.increaseCartQuantity)
  const decreaseCartQuantity = useCartStore((state) => state.decreaseCartQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  useEffect(() => {
    const cartItemQty = cart.find(x => x.id === id)?.quantity || 0
    setQuantity(cartItemQty)
  }, [cart])

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image src={imgUrl} width={400} height={225} alt="Shopping" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          { title }
          <div className="badge badge-secondary">New</div>
        </h2>
        <p className='text-3xl font-semibold text-gray-500'>{ formatCurrency(price) }</p>
        <div className="card-actions">
          { quantity === 0 ? (
              <button className="btn"
                onClick={() => increaseCartQuantity(id)}
              >Add to cart</button>
            )
            : (
                <div className="w-full flex justify-between">

                  <div className='flex gap-2'>
                    {/* DECREASE */}
                    <button className="btn btn-square btn-outline"
                      onClick={() => decreaseCartQuantity(id)}
                    >
                      <span className="text-2xl">&#8722;</span>
                    </button>

                    {/* INCREASE */}
                    <button className="btn btn-square btn-outline"
                      onClick={() => increaseCartQuantity(id)}
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
                    onClick={() => removeFromCart(id)}
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

export default ProductCard