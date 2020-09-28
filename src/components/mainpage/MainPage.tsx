import React from 'react'
import useMainPage from './useMainPage'
import './MainPage.css'

//----------------------------------------------------------------------------------------
const MainPage: React.FC = () => {
  //--------------------------------------------------------------------------------------
  const {
    registerStatus,
    loginStatus,
    isDisabled,
    handleFirstInput,
    handleSecondInput,
    handleButton
  } = useMainPage()
  //--------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------
  return (
    <main>
      <div>
        <input placeholder='Digite seu e-mail:' onChange={handleFirstInput} />
        <input
          type='password'
          placeholder='Digite sua senha:'
          onChange={handleSecondInput}
        />
        <button
          disabled={isDisabled()}
          onPointerDown={() => handleButton('login')}
          children='Entrar'
        />
        <button
          disabled={isDisabled()}
          onPointerDown={() => handleButton('register')}
          children='Criar nova conta'
        />
      </div>

      {registerStatus !== null && (
        <h5
          className={registerStatus}
          children={
            registerStatus === 'failure'
              ? 'Falha durante registro.'
              : registerStatus === 'invalid'
              ? 'Dados inválidos.'
              : registerStatus === 'already'
              ? 'Usuário já cadastrado.'
              : 'Usuário registrado com sucesso.'
          }
        />
      )}

      {loginStatus !== null && (
        <h5
          className={loginStatus}
          children={
            loginStatus === 'loginfailure'
              ? 'Falha durante o login. Tente novamente.'
              : 'Login inválido.'
          }
        />
      )}
    </main>
  )
  //--------------------------------------------------------------------------------------
}
//----------------------------------------------------------------------------------------

export default MainPage
