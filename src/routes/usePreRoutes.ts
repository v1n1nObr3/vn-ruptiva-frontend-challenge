import React from 'react'
import isLogged from '../utils/functions/is_logged'

//-------------------------------------------------------------------------------
function usePreRoutes() {
  const [confirm, setConfirm] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    isLogged(setConfirm)
  }, [])

  return confirm
}
//-------------------------------------------------------------------------------

export default usePreRoutes
