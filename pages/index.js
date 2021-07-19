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

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {

  const githubUser = 'fernandoc89';
  const [communities, setCommunities] = React.useState([]);

  //const communities = communities[0];
  //const updatecommunities;setCommunities = communities[1]
  const favoritesPeoples = ['juunegreiros', 'omariosouto', 'peas', 'pauloons']

  // 1 - Pegar o array de dados do github
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function () {
    // GET
    fetch("https://api.github.com/users/fernandoc89/followers")
      .then(async function (serverResponse) {
        return serverResponse.json();
      })
      .then(async function (serverResponseFull) {
        setFollowers(serverResponseFull);
      })

    // Buscando da API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '7ab6d85f2bc5bbf2ec743c0785e093',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "query": `query {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }`
      })
    })
      .then((response) => response.json())
      .then((fullResponse) => {
        const communitiesFromDato = fullResponse.data.allCommunities;
        console.log(communitiesFromDato)
        setCommunities(communitiesFromDato)
      })

  }, [])
  // 2 - Criar um box que vai ter um map, baseado no items do array que buscamos os followers do github


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

              const community = {
                title: formData.get('title'),
                imageUrl: formData.get('image'),
                creatorSlug: githubUser,
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(community)
              })
              .then(async (response) => {
                const data = await response.json();
                console.log(data.newRegistry);
                const community = data.newRegistry;
                const updateCommunities = [...communities, community];
                setCommunities(updateCommunities);
              })
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

          <ProfileRelationsBox title="Seguidores" items={followers} />
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
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.map((index) => {
                return (
                  <li key={index.id}>
                    <a href={`/communities/${index.id}`}>
                      <img src={index.imageUrl} />
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
