import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import useCartStore from "@/stores/cartStore"
import Layout from '@/components/shared/Layout'
import EmptyList from '@/components/shared/EmptyList'
import {formatCurrency} from '@/utils/formatCurrency'

import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'

const ProductSlug = () => {
  const { query: { slug } } = useRouter()
  
  const getProduct = useCartStore((state) => state.getProduct)
  const product = useCartStore((state) => state.product)

  useEffect(() => {
    getProduct(slug)
  }, [])

  return(
    <Layout>
      <h2 className='my-8 text-2xl flex justify-center text-indigo-500 font-semibold'>Product</h2>
      
      {!product && <EmptyList text={"Product not found"} />}

      {product && (
        <>
        {/* GO BACK */}
        <div className="py-2 flex items-center gap-2">
          <ArrowSmallLeftIcon className='w-8' />
          <Link href="/">Return to products</Link>
        </div>

        {/* WRAPPER */}
        <div className="grid md:grid-cols-4 md:gap-3">
          {/* 1ST COL: IMAGE */}
          <div className='md:col-span-2 p-2 border border-gray-100'>
            <Image src={product.img} width={640} height={640} alt={product.name} layout="responsive" />
          </div>
          {/* 2ND COL: DETAILS */}
          <div>
            <ul>
              <li>
                <h3 className='text-lg'>{ product.name }</h3>
              </li>
              <li>Category: { product.category }</li>
              <li>Brand: { product.brand }</li>
              <li>{ product.rating } of { product.numReviews } reviews </li>
              <li>Description: { product.description }</li>
            </ul>
          </div>
          {/* 3RD COL: PRICE */}
          <div className=''>
            <div className="card p-5">
              <div className="flex justify-between">
                <div>Price</div>
                <div>{ formatCurrency(product.price) }</div>
              </div>
              <div className="mt-2 flex justify-between">
                <div>Status</div>
                <div>{ product.quantityOnHand > 0 ? 'In stock' : 'Currently out of stock' }</div>
              </div>
              {/* BUTTON */}
              <button className='mt-8 btn btn-wide'>Add to cart</button>
            </div>
          </div>
        </div>
        </>
      )}


    </Layout>
  )
}
export default ProductSlug

// npm i -D @types/react