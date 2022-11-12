import { useEffect, useState } from 'react'
import Head from 'next/head'

// import useAuthStore from "@/stores/authStore"

import Header from './Header'
import Footer from './Footer'

import toast, { Toaster } from 'react-hot-toast'

const Layout = ({title, description, keywords, children}) => {
  // const [alert, setAlert] = useState()
  /* STORE */
  // const authNotification = useAuthStore((state) => state.notification)
  // const authRemoveNotification = useAuthStore((state) => state.removeNotification)

  // useEffect(() => {
  //   setAlert(`${authNotification.message}`)
  //   showAlert(authNotification.type)

  //   return () => {
  //     setTimeout(() => {
  //       authRemoveNotification()
  //     }, 3000)
  
  //     setAlert("")
  //   }
  // }, [authNotification])

  // const showAlert = (type) => {
  //   if(type === 'success'){
  //     toast.success(alert)
  //   } else {
  //     toast.error(alert)
  //   }
  // }

  return (
    <>
      <Head>
        <title>{ title } - Lazeeza</title>
        <meta name="description" content={ description } />
        <meta name="keywords" content={ keywords } />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col justify-between">
        <Header />

        <main className='container m-auto mt-4 px-4'>
          { children }
        </main>

        <Footer />
      </div>

      <Toaster />
    </>
  )
}

Layout.defaultProps={
  title: "Lazzeza",
  description: "The finest Mediterranean Baklava Kansas City",
  keywords: "Balorieh Cashew, Balorieh Pistachio, Asyeh Cashew, Asyeh Pistachio, Mabroumeh, Turkish Warbat, and Koul we Shkour"
}

export default Layout