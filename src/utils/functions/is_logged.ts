import sendRequest from './send_req'

export default async function isLogged(
  setter: React.Dispatch<React.SetStateAction<boolean | null>>
) {
  const responsePayload = await sendRequest('logged', {})

  if (responsePayload instanceof Error) setter(false)
  else {
    if (responsePayload === true) setter(true)
    else setter(false)
  }
}
