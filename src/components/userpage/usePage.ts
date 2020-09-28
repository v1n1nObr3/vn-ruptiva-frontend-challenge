import React from 'react'
import sendRequest from '../../utils/functions/send_req'
import initialState from '../../utils/reducers/initial_state'
import userReducer from '../../utils/reducers/user_reducer'

const usePage = () => {
  //---------------------------------------------------------------------------------
  const [userData, dispatch] = React.useReducer(userReducer, initialState)

  const [pageIndex, setPageIndex] = React.useState<1 | 2>(1)

  const [listSelected, setList] = React.useState(-1)

  const [isSubmitting, setSubmit] = React.useState(false)
  //---------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------
  React.useEffect(() => {
    ;(async () => {
      const responsePayload = await sendRequest('user/repositories/get', {})

      if (responsePayload instanceof Error) alert(responsePayload.message)
      else if (responsePayload === null)
        alert('Falha na aquisição dos dados...')
      else {
        dispatch({
          message: 'Update-Repositories',
          payload: responsePayload.data
        })
      }
    })()

    // eslint-disable-next-line
  }, [])
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  const handleFirstInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.value.length < 64) {
      dispatch({
        message: 'Update-Name',
        payload: e.target.value
      })
    }
  }

  const handleSecondInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.value.length < 128) {
      dispatch({
        message: 'Update-URL',
        payload: e.target.value
      })
    }
  }

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    dispatch({
      message: 'Update-Type',
      payload: e.target.value === 'Público' ? 'public' : 'private'
    })
  }

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.target.value.length < 512) {
      dispatch({
        message: 'Update-Description',
        payload: e.target.value
      })
    }
  }

  const handleAdd = async () => {
    if (userData.newRepository.name.length !== 0 && !isSubmitting) {
      setSubmit(true)

      const responsePayload = await sendRequest(
        'user/repositories/add',
        userData.newRepository
      )

      if (responsePayload instanceof Error) {
        alert(responsePayload.message)
      } else if (responsePayload === null) {
        alert('Registro inválido')
      } else {
        const data = responsePayload.data
        dispatch({
          message: 'Update-Everything',
          payload: data
        })
        setPageIndex(2)
      }

      setSubmit(false)
    }
  }

  const handleDelete = async () => {
    if (!isSubmitting) {
      setSubmit(true)

      const responsePayload = await sendRequest(
        'user/repositories/delete',
        userData.repositories[listSelected]
      )

      if (responsePayload instanceof Error) {
        alert(responsePayload.message)
      } else if (responsePayload === null) {
        alert('Exclusão Inválida')
      } else {
        const data = responsePayload.data
        const repositoriesUpdated = userData.repositories.filter(
          (repo) => JSON.stringify(repo) !== JSON.stringify(data)
        )
        setList(-1)
        dispatch({
          message: 'Update-Repositories',
          payload: repositoriesUpdated
        })
      }

      setSubmit(false)
    }
  }

  const handleLogout = async () => {
    const responsePayload = await sendRequest('logout', {})

    if (responsePayload instanceof Error) {
      document.cookie = 'ruptiva=; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    }

    window.history.pushState(undefined, '', '/')
    window.location.reload()
  }
  //---------------------------------------------------------------------------------

  return {
    userData,
    pageIndex,
    setPageIndex,
    listSelected,
    setList,
    isSubmitting,
    handleFirstInputChange,
    handleSecondInputChange,
    handleSelect,
    handleTextAreaChange,
    handleAdd,
    handleDelete,
    handleLogout
  }
}

export default usePage
