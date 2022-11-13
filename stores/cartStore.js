import create from 'zustand'
import storeData from '@/data/items.json'
import data from '@/utils/data'
import toast from 'react-hot-toast'

const useCartStore = create((set, get) => ({

  cart: [],
  cartQuantity: 0,
  cartTotal: 0,
  products: data.products,
  // products: storeData,
  product: null,

   //== RESET CART
  //====================
  clearCart: () => set({cart: []}),

   //== INCREASE QUANTITY
  //====================
  increaseCartQuantity: (id) => {
    /* ITEM NOT IN CART */
    set((state) => ({
      cart: state.cart.find(item => item.id === id) == null ?
            [
              ...state.cart,
              {
                id: id,
                quantity: 1
              }
            ]
            /* ITEM IN CART */  
            : state.cart.map(item => item.id === id ?
              {...item, quantity: item.quantity + 1}
              : item
            )
    }))
    toast.success('Item added successfully!')
  },

   //== DECREASE QUANTITY
  //====================
  decreaseCartQuantity: (id) => {
    set((state) => ({
      cart: state.cart.find(item => item.id === id)?.quantity === 1 ?
              state.cart.filter(item => item.id !== id)
            : state.cart.map(item => item.id === id ?
              {...item, quantity: item.quantity - 1}
              : item
            )
    }))
    toast.success('Quantity decreased successfully!')
  },

   //== REMOVE ITEM FROM CART
  //====================
  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter(x => x.id !== id)
    }))
    toast.success('Item removed successfully!')
  },

   //== GET CART QUANTITY
  //====================
  getCartQuantity: () => {
    set((state) => ({
      cartQuantity: state.cart.reduce((sum, item) => sum + item.quantity, 0)
    }))
  },

   //== GET CART TOTAL
  //====================
  getCartTotal: () => {
    set((state) => ({
      cartTotal: state.cart.reduce((total, cartItem) => {
        const item = state.products.find(x => x.id === cartItem.id)
        return total + ((item?.price || 0) * cartItem.quantity)
      }, 0)
    }))
  },

   //== GET PRODUCT DETAIL
  //====================
  getProduct: (slug) => {
    set((state) => ({
      product: state.products.find(x => x.slug === slug)
    }))
  },
  
}))

export default useCartStore