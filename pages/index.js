import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { OikutMenu, OikutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/OikutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <OikutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {

  const githubUser = 'fernandoc89';
  const [communitys, setCommunitys] = React.useState([{
    id: '45648794541515789746546',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  //const communitys = communitys[0];
  //const updateCommunitys;setCommunitys = communitys[1]
  const favoritesPeoples = ['juunegreiros', 'omariosouto', 'peas', 'pauloons']

  return (
    <>
      <OikutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault(); // evita que a página atualize
              const formData = new FormData(e.target);

              console.log('Campo: ', formData.get('title'));
              console.log('Campo: ', formData.get('image'));

              const createCommunity = {
                id: new Date().toISOString(),
                title: formData.get('title'),
                image: formData.get('image'),
              }
              const updateCommunitys = [...communitys, createCommunity]
              setCommunitys(updateCommunitys);

            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidades ({favoritesPeoples.length})
            </h2>

            <ul>
              {favoritesPeoples.map((index) => {
                return (
                  <li key={index}>
                    <a href={`users/${index}`} >
                      <img src={`https://github.com/${index}.png`} />
                      <span>{index}</span>
                    </a>
                  </li>
                )
              }
              )}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communitys.length})
            </h2>

            <ul>
              {communitys.map((index) => {
                return (
                  <li key={index.id}>
                    <a href={`users/${index.title}`} key={index.title}>
                      <img src={index.image} />
                      <span>{index.title}</span>
                    </a>
                  </li>
                )
              }
              )}
            </ul>
          </ProfileRelationsBoxWrapper>

          <Box>

          </Box>
        </div>
      </MainGrid>
    </>
  )
}
