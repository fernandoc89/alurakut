import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { OikutMenu, OrkutNostalgicIconSet } from '../src/lib/OikutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props){
  console.log(props);
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {

  const githubUser = 'fernandoc89';
  const favoritesPeoples = ['juunegreiros', 'omariosouto', 'peas' ,'pauloons']

  return (
    <>
      <OikutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo
            </h1>
            
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidades ({favoritesPeoples.length})
            </h2>

              <ul>
                {favoritesPeoples.map((index)=> {
                  return (
                    <li>
                      <a href={`users/${index}`} key={index}>
                        <img src={`https://github.com/${index}.png`} />
                        <span>{index}</span>
                      </a>
                    </li>
                  )
                }
                )}
              </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
