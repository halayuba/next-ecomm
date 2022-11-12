import Head from 'next/head'

import styles from '@/styles/Layout.module.css'

const Layout = ({title, description, keywords, children}) => {
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ description } />
        <meta name="keywords" content={ keywords } />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
        <div className="m-auto bg-slate-50 rounded-md w-4/5 xl:w-3/5 h-4/5 lg:h-3/4 grid lg:grid-cols-2">
          <div className={styles.imgStyle}>
            <div className={ styles.cartoonImg }></div>
          </div>
          <div className="right flex flex-col justify-evenly">
            <div className="text-center py-4">
              { children }
            </div>      
          </div>
        </div>
        
      </div>
    </>
  )
}

Layout.defaultProps={
  title: "Next Auth",
  description: "Admin Dashboard",
  keywords: "Dining, food, reservation"
}

export default Layout