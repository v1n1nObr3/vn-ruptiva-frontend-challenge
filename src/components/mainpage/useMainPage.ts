import React from 'react'
import sendRequest from '../../utils/functions/send_req'

const useMainPage = () => {
  //----------------------------------------------------------------------------------------------------------
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setSubmit] = React.useState(false)

  const [registerStatus, setRegisterStatus] = React.useState<
    'failure' | 'invalid' | 'already' | 'success' | null
  >(null)

  const [loginStatus, setLoginStatus] = React.useState<
    'loginfailure' | 'logininvalid' | null
  >(null)
  //----------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------
  const isDisabled = () => {
    if (isSubmitting) return true

    if (credentials.password.length < 8) return true

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials.email))
      return true

    return false
  }

  const handleFirstInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCredentials({
      ...credentials,
      email: e.target.value
    })
  }

  const handleSecondInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCredentials({
      ...credentials,
      password: e.target.value
    })
  }

  const handleButton = async (ctx: 'register' | 'login') => {
    const isAbletoSubmit =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials.email) &&
      credentials.password.length >= 8 &&
      !isSubmitting

    if (isAbletoSubmit) {
      setSubmit(true)

      if (ctx === 'register') {
        const responsePayload = await sendRequest(ctx, credentials)

        if (responsePayload instanceof Error) {
          setRegisterStatus('failure')
          setTimeout(() => {
            setRegisterStatus(null)
            setSubmit(false)
          }, 3000)
        } else if (responsePayload === null) {
          setRegisterStatus('invalid')
          setTimeout(() => {
            setRegisterStatus(null)
            setSubmit(false)
          }, 3000)
        } else {
          const message = responsePayload.message

          if (message === 'E-mail already registered.') {
            setRegisterStatus('already')
            setTimeout(() => {
              setRegisterStatus(null)
              setSubmit(false)
            }, 3000)
          }
          if (message === 'User successfully created.') {
            setRegisterStatus('success')
            setTimeout(() => {
              window.location.reload()
            }, 3000)
          }
        }
      }

      if (ctx === 'login') {
        const responsePayload = await sendRequest(ctx, credentials)

        if (responsePayload instanceof Error) {
          setLoginStatus('loginfailure')
          setTimeout(() => {
            setLoginStatus(null)
            setSubmit(false)
          }, 3000)
        } else if (responsePayload === null) {
          setLoginStatus('logininvalid')
          setTimeout(() => {
            setLoginStatus(null)
            setSubmit(false)
          }, 3000)
        } else {
          const message = responsePayload.message
          if (message === 'Successfully logged.') window.location.reload()
        }
      }
    }
  }
  //----------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------
  return {
    registerStatus,
    loginStatus,
    handleFirstInput,
    handleSecondInput,
    handleButton,
    isDisabled
  }
  //----------------------------------------------------------------------------------------------------------
}

export default useMainPage
