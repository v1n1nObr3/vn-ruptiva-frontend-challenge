//---------------------------------------------------------------------------------------
const sendRequest = async (path: string, payload: any) => {
  const url = 'http://localhost:4000/' + path

  const body = JSON.stringify(payload)

  const headers = new Headers()

  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  const envelope: RequestInit = {
    method: 'POST',
    headers,
    body,
    mode: 'cors',
    credentials: 'include'
  }

  const request = new Request(url, envelope)

  try {
    const response = await fetch(request)
    return await response.json()
  } catch (err) {
    return await Promise.resolve<Error>(err)
  }
}
//---------------------------------------------------------------------------------------

export default sendRequest
