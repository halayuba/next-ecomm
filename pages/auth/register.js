import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

import Layout from "@/components/shared/AuthLayout"
import styles from '@/styles/Form.module.css'

import { AtSymbol, User, FingerPrint } from '@heroicons/react/24/solid'
import { useFormik } from 'formik'
import { registerValidate } from "lib/validate"
import toast, { Toaster } from 'react-hot-toast'

const register = () => {
  const[show, setShow] = useState({
    password: false,
    cpassword: false
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: ''
    },
    validate: registerValidate,    
    onSubmit
  });

  async function onSubmit(values) {
    console.log(values);
  }

  // useEffect(() => {
  //   if(formik.errors){
  //     toast.error('There is an error in completing the sign up form')
  //   }
  // }, [formik.errors])

  return (
    <>
      <Toaster />
    
      <Layout title="Register">
        <section className="w-full lg:w-3/4 mx-auto flex flex-col gap-2">
          <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-2">Register</h1>
            <p className="w-3/4 mx-auto text-gray-400">Join the best solution out there for restaurant content management.</p>
          </div>

          <form className=""
            onSubmit={formik.handleSubmit}
          >
            <div className={ styles.input_group }>
              {/* USERNAME WITH ICON */}
              <div className="flex items-center relative">
                <input type="text" name="username" placeholder="Username" className={ styles.form_input } 
                  {...formik.getFieldProps('username')}
                />
                <span className="absolute right-2">
                  <User size={25} />
                </span>
              </div>
                {/* ERROR VALIDATION */}
                {formik.errors.username && formik.touched.username
                  ? <span className="text-sm text-rose-500">{ formik.errors.username }</span>
                  : <></>
                }

              {/* EMAIL WITH ICON */}
              <div className="flex items-center relative">
              <input type="email" name="email" placeholder="Email" className={ styles.form_input } 
                {...formik.getFieldProps('email')}
              />
                <span className="absolute right-2">
                  <HiAtSymbol size={25} />
                </span>
              </div>
                {/* ERROR VALIDATION */}
                {formik.errors.email && formik.touched.email
                  ? <span className="text-sm text-rose-500">{ formik.errors.email }</span>
                  : <></>
                }           

              {/* PASSWORD WITH ICON */}
              <div className="flex items-center relative">
                <input name="password" placeholder="Password" className={ styles.form_input } 
                  type={`${show.password ? "text" : "password"}`}
                  {...formik.getFieldProps('password')}
                />
                <span onClick={() => setShow({...show, password: !show.password})} className={ styles.form_input_icon }>
                  <FingerPrint size={25} />
                </span>
              </div>
                {/* ERROR VALIDATION */}
                {formik.errors.password && formik.touched.password
                  ? <span className="text-sm text-rose-500">{ formik.errors.password }</span>
                  : <></>
                }

              {/* CONFIRM PASSWORD WITH ICON */}
              <div className="flex items-center relative">
                <input name="cpassword" placeholder="Confirm Password" className={ styles.form_input } 
                  type={`${show.cpassword ? "text" : "password"}`}
                  {...formik.getFieldProps('cpassword')}
                />
                <span onClick={() => setShow({...show, cpassword: !show.cpassword})} className={ styles.form_input_icon }>
                  <FingerPrint size={25} />
                </span>
              </div>
                {/* ERROR VALIDATION */}
                {formik.errors.cpassword && formik.touched.cpassword
                  ? <span className="text-sm text-rose-500">{ formik.errors.cpassword }</span>
                  : <></>
                }

              {/* REGISTER BTN */}
              <button className={ styles.button } type="submit">Sign up</button>
            </div>

          </form>

          <p className="mt-12 text-gray-400 text-sm text-center">
            Already registered? 
            <Link href="/auth/login">
              <a className="text-blue-700"> Log in to your account</a>
            </Link>
          </p>
        </section>
      </Layout>
    </>
  )
}

export default register