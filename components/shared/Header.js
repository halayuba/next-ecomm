import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import useAuthStore from "@/stores/authStore"
import useCartStore from "@/stores/cartStore"
import { formatCurrency } from '@/utils/formatCurrency' 

import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'

const Header = () => {
  const router = useRouter()
  /* STORE */
  // const user = useAuthStore((state) => state.user)
  const user = {username: 'S. Bashir'}
  // const user = ""
  const logout = useAuthStore((state) => state.logout)
  // const authenticated = useAuthStore((state) => state.authenticated)
  const cart = useCartStore((state) => state.cart)
  const cartQuantity = useCartStore((state) => state.cartQuantity)
  const cartTotal = useCartStore((state) => state.cartTotal)
  const getCartQuantity = useCartStore((state) => state.getCartQuantity)
  const getCartTotal = useCartStore((state) => state.getCartTotal)

  // useEffect(() => {
  //   if(!user){
  //     authenticated()      
  //   }
  // }, [])

  useEffect(() => {
    /* CART QUANTITY */
    getCartQuantity()

    /* CART TOTAL */
    getCartTotal()
  }, [cart])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="navbar bg-base-100 px-4 shadow-md">

      {/* LOGO */}
      <div className="flex-1">
        <Link href={"/"}>
          <div className="w-[100px] md:w-[160px]">
            <Image src="/img/lazeeza.svg" width={140} height={89} className="cursor-pointer" alt="logo" layout="responsive" />
          </div>
        </Link>
      </div>

      {/* NAVBAR - CENTER */}
      <div className="flex-1">
        <ul className="menu menu-horizontal p-0">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/qa">Q / A</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
      
      <div className="flex-none">
        {/* CART */}
        { cartQuantity > 0 && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">{ cartQuantity }</span>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">{ cartQuantity } Items</span>
                <span className="text-info">Subtotal: { formatCurrency(cartTotal) }</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
        )}

        { user ? (
          <>
            {/* LOGGED IN: USER ACCOUNT */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image src="/img/me.jpg" alt="Avatar" width={80} height={80} />
                </div>
              </label>
              <ul tabIndex={0} className="dropdown-content menu menu-compact mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li className='bg-indigo-400 text-white'><a className='cursor-default'>{ user.username }</a></li>
                <li><Link href="/auth/dashboard">Dashboard</Link></li>
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* NOT LOGGED IN: USER AUTH */}
            <div className="dropdown dropdown-end xl:mr-6">
              <ArrowLeftOnRectangleIcon tabIndex={0} className='w-8 m-1 cursor-pointer' />
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                <li><Link href="/auth/login">Login</Link></li>
                <li><Link href="/auth/register">Register</Link></li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header