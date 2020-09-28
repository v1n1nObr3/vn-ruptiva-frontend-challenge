import React from 'react'
import { ReactComponent as GithubIMG } from '../../utils/images/ruptiva.svg'
import { ReactComponent as Text } from '../../utils/images/text.svg'
import { ReactComponent as SmallGithub } from '../../utils/images/github_img.svg'
import { ReactComponent as Trash } from '../../utils/images/trash.svg'
import { ReactComponent as FirstButton } from '../../utils/images/first_button.svg'
import { ReactComponent as SecondButton } from '../../utils/images/second_button.svg'
import { ReactComponent as ThirdButton } from '../../utils/images/third_button.svg'
import usePage from './usePage'
import './UserPage.css'

//-------------------------------------------------------------------------------------
const UserPage: React.FC = function () {
  //-----------------------------------------------------------------------------------
  const {
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
  } = usePage()
  //-----------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------
  return (
    <section id='user-section'>
      <div>
        <Text />

        {pageIndex === 1 ? (
          <>
            <div id='repo-add'>
              <label> Nome do Repositório: </label>

              <input
                value={userData.newRepository.name}
                onChange={handleFirstInputChange}
              />

              <label> URL: </label>

              <input
                value={userData.newRepository.url}
                onChange={handleSecondInputChange}
              />

              <label> Tipo de repositório: </label>

              <select
                value={
                  userData.newRepository.type === 'public'
                    ? 'Público'
                    : 'Privado'
                }
                onChange={handleSelect}
              >
                <option> Público </option>
                <option> Privado </option>
              </select>

              <label> Descrição: </label>

              <textarea
                value={userData.newRepository.description}
                placeholder='Forneça detalhes sobre seu repositório...'
                onChange={handleTextAreaChange}
              />

              {!isSubmitting && (
                <button onPointerDown={handleAdd}> Adicionar </button>
              )}
            </div>

            <GithubIMG />
          </>
        ) : (
          <>
            <ul>
              {userData.repositories?.map((item, idx) => (
                <li
                  key={'rep' + idx}
                  children={
                    <>
                      <SmallGithub />
                      <h1> {item.name} </h1>
                      {listSelected === idx && (
                        <Trash onPointerDown={handleDelete} />
                      )}
                    </>
                  }
                  onPointerDown={() => setList(idx)}
                />
              ))}
            </ul>

            {listSelected !== -1 && (
              <div id='repo-listed'>
                <h4> Nome: </h4>
                <p> {userData.repositories[listSelected].name} </p>
                <h4> URL: </h4>
                <a
                  href={userData.repositories[listSelected].url}
                  rel='noopener noreferrer'
                  children={userData.repositories[listSelected].url}
                />
                <h4> Tipo: </h4>
                <p
                  children={
                    userData.repositories[listSelected].type === 'public'
                      ? 'Público'
                      : 'Privado'
                  }
                />
                <h4> Descrição: </h4>
                <p> {userData.repositories[listSelected].description} </p>
              </div>
            )}
          </>
        )}
      </div>

      <footer>
        <FirstButton onPointerDown={() => setPageIndex(1)} />
        <SecondButton onPointerDown={() => setPageIndex(2)} />
        <ThirdButton onPointerDown={handleLogout} />
      </footer>
    </section>
  )
  //-----------------------------------------------------------------------------------
}
//-------------------------------------------------------------------------------------
export default UserPage
