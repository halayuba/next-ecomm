import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

import Layout from "@/components/shared/AuthLayout"
import styles from '@/styles/Form.module.css'

import loginValidate from "lib/validate"

import { signIn } from "next-auth/react"
import { FingerPrint } from '@heroicons/react/24/solid'
import { useFormik } from 'formik';

const login = () => {
  const[show, setShow] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: loginValidate,
    onSubmit
  });

  async function onSubmit(values) {
    console.log(values);
  }

  async function handleGoogleSignIn() {
    signIn('google', 
      { callbackUrl: "http://localhost:3000" }
    )
  }

  async function handleGithubSignIn() {
    signIn('github', 
      { callbackUrl: "http://localhost:3000" }
    )
  }

  return (
    <Layout title="Login">
      <section className="w-full lg:w-3/4 mx-auto flex flex-col gap-2">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-2">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">Welcome back.</p>
        </div>

        <form className=""
          onSubmit={formik.handleSubmit}
        >
          <div className={ styles.input_group }>
            {/* EMAIL */}
            <input type="email" name="email" placeholder="Email" className={ styles.form_input } 
              {...formik.getFieldProps('email')}
            />
              {/* ERROR VALIDATION */}
              {formik.errors.email && formik.touched.email
                ? <span className="text-sm text-rose-500">{ formik.errors.email }</span>
                : <></>
              }

            {/* PASSWORD WITH ICON */}
            <div className="flex items-center relative">
              <input name="password" placeholder="Password" className={ styles.form_input }
                type={`${show ? "text" : "password"}`}
                {...formik.getFieldProps('password')}
              />
              <span onClick={() => setShow(!show)} className={ styles.form_input_icon }>
                <FingerPrint size={25} />
              </span>
            </div>
              {/* ERROR VALIDATION */}
              {formik.errors.password && formik.touched.password
                ? <span className="text-sm text-rose-500">{ formik.errors.password }</span>
                : <></>
              }

            {/* LOGIN BTN */}
            <button className={ styles.button } type="submit">Log in</button>
          </div>

          {/* SOCIAL LOGIN */}
          <div className={ styles.button_group }>
            {/* GOOGLE */}
            <button className={ styles.button_social } type="button"
              onClick={handleGoogleSignIn}
            >
              <Image src={'/assets/google.svg'} width={20} height={20} />
              Sign in with Google
            </button>
            {/* GITHUB */}
            <button className={ styles.button_social } type="button"
              onClick={handleGithubSignIn}
            >
              <Image src={'/assets/github.svg'} width={25} height={25} />
              Sign in with Github
            </button>
          </div>
        </form>

        <p className="mt-12 text-gray-400 text-sm text-center">
          Don't have an account? 
          <Link href="/auth/register">
            <a className="text-blue-700"> Create a new account</a>
          </Link>
        </p>
      </section>

    </Layout>
  )
}

export default login