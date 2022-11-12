import {NEXT_URL} from '@/config/index'

export async function fetcher( params, options={} ) {
  const url = `${NEXT_URL}/${params}` 

  let returnedResult = []

  try {
    const response = options ? await fetch(url, options) : await fetch(url)

    if (!response.ok) {
      console.log(response); //Response {type: 'basic', url: 'http://localhost:3000/api/user', redirected: false, status: 403, ok: false, …}
      // throw new Error(`Error! status: ${response.status}`); //Error: Error! status: 403
      returnedResult['data'] = null
      returnedResult['message'] = `Error! status: ${response.status}. ${response.error.message}.`
      return returnedResult

    } else {
        const result = await response.json()

        returnedResult['data'] = result
        returnedResult['message'] = null
      
        return returnedResult
    }

  } catch (error) {
      console.log('Error! ' + error)
      returnedResult['data'] = null
      returnedResult['message'] = error
      return returnedResult
    
  }

}