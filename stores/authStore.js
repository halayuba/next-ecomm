import create from 'zustand'
import { fetcher } from 'lib/api'
import {NEXT_URL} from '@/config/index'

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  isLoggedOut: false,
  hasChecked: false,
  user: null,
  error: null,
  notification: {
    type: "",
    message: ""
  },
   //== REMOVE NOTIFICATION
  //====================
  removeNotification: () => set({ notification: {type: "", message: ""} }),
   //== LOGIN
  //====================
  login: async (identifier, password) => {
    // const TARGET_URL = "client" // TARGETING CLIENT NEXT_URL
    // const META = false // NOT INTERESTED IN THE META PORTION OF THE RESPONSE
    // const res = await fetcher('login', {
    const res = await fetch(`${NEXT_URL}/login`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        identifier,
        password
      })
    }
    // META,
    // TARGET_URL
    )
    const {user} = await res.json()

    if(user){
      set({ user })
      // set({ isLoggedIn: true })
//       set({ isLoggedOut: false })
      set({ notification: {type: "success", message: "Logged in successfully!"}})
    } else {
      // set({ isLoggedIn: false })
      // set({ isLoggedOut: true })
      // set({ error: message })
      set({ notification: {type: "error", message: "Authentication failed!"}})
    }
    // const response = await fetcher('auth/local', {
    //   method: "POST",
    //   headers:{
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     identifier,
    //     password
    //   })
    // })
    // console.log(response.user);
    // if(!response.user){
    //   toast.error('Authentication failed!')
    // } else {
    //   set({ user: response.user })
    //   set({ isLoggedIn: true })
    //   toast.success('Logged in successfully!')
    // }
  },
   //== REGISTER
  //====================
  register: async (payload) => {
    // const TARGET_URL = "client" // TARGETING CLIENT NEXT_URL
    // const res = await fetcher('register', {
    const res = await fetch(`${NEXT_URL}/register`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
      // TARGET_URL
    )
    const {user} = await res.json()

    if(user){
      set({ user })
      // set({ isLoggedIn: true })
      // set({ isLoggedOut: false })
      set({ notification: {type: "success", message: "Registered successfully!"}})
    } else {
      // set({ isLoggedIn: false })
      // set({ isLoggedOut: true })
      // set({ error: res.message })
      set({ notification: {type: "error", message: "Registration failed!"}})
    }
  },
   //== LOGOUT
  //====================
  logout: async() => {
    // const TARGET_URL = "client" // TARGETING CLIENT NEXT_URL
    // const res = await fetcher('logout', {
    //   method: "POST"
    // }, TARGET_URL)
    const res = await fetch(`${NEXT_URL}/logout`, { method: "POST" })
    const {message} = await res.json()

    if(message === 'Success'){
      // set({ user: null })
      set((state) => ({
        user: null
      }))
      // set({ isLoggedIn: false })
      // set({ isLoggedOut: true })
      set({ notification: {type: "success", message: "Logged out successfully!"}})
    } else {
      set({ user: null })
      set({ notification: {type: "error", message: "Logged out failed!"}})
    }
  },
   //== CHECK IF USER IS AUTHENTICATED
  //====================
  authenticated: async() => {
    // const TARGET_URL = "client" // TARGETING CLIENT NEXT_URL
    // const META = false // NOT INTERESTED IN THE META PORTION OF THE RESPONSE
    // const res = await fetcher('user', {}, META, TARGET_URL)
    const res = await fetch(`${NEXT_URL}/user`)
    const {user} = await res.json()

    if(!res){
      set((state) => ({
        user: null
      }))
      // set({ isLoggedIn: false })
//       set({ isLoggedOut: true })
    } else {
      set({ user })
      // set({ isLoggedIn: true })
    }
  }

}))

export default useAuthStore