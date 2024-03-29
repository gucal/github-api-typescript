import { MutableRefObject, useRef, useContext, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Alert, Button, Container, Flex, Input, Title, Card } from '../components'
import { LinkIcon, TwitterIcon, Spin } from '../components/Icons'
import UserContext from '../context/UserContext/store'
import AuthContext from '../context/AuthenticationContext/store'
import { getUserInfo } from '../services/users/getUserInfo'

const Home: NextPage = () => {
  const [isLanding, setLanding] = useState(true)
  const { state, dispatch } = useContext(UserContext)
  const authState = useContext(AuthContext).state

  const isLoading: any = state.isLoading
  const userInfo: any = state.userInfo
  const userRepoInfo: any = state.userRepositories
  const userTogetherLanguages: any = state.userTogetherLanguages
  const isUserError: any = state.isUserError

  const userNameInputRef = useRef() as MutableRefObject<HTMLInputElement>

  const router = useRouter()

  useEffect(() => {
    if (!authState.isLogin) {
      router.push('/login')
    }
  }, [])

  const searchUser = async () => {
    const inputValue = userNameInputRef.current.value.trim().toLowerCase()
    await getUserInfo(inputValue, dispatch)
  }

  return (
    <Container>
      <Head>
        <title>Github User Information</title>
      </Head>
      {isLanding ? (
        <Flex flexDirection={'column'}>
          <Title className="text-center">Github User Information</Title>
          <p className="text-center">
            It is a web application that displays important information on users Github accounts.
            Lists the ratio of languages used to all languages.
          </p>
          <span className="text-center">
            In this application you can find the following information of Github user:
          </span>
          <div className="flex justify-center">
            <ul className="mt-4 mb-4">
              <li>Name</li>
              <li>Avatar</li>
              <li>Location</li>
              <li>Following and follower count</li>
              <li>Public repository count</li>
              <li>Twitter and website links</li>
              <li>Languages used and their ratio to all languages.</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Button style={{ maxWidth: '380px' }} block onClick={() => setLanding(false)}>
              GO
            </Button>
          </div>
        </Flex>
      ) : (
        <>
          <Flex gap={12}>
            <Input
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              defaultValue={userInfo.login}
              block
              ref={userNameInputRef}
              placeholder="Enter username..."
            />
            <Button style={{ minWidth: '100px' }} onClick={searchUser}>
              Search User
            </Button>
          </Flex>

          {isLoading ? (
            <div className="mt-4">
              <Spin />
            </div>
          ) : isUserError ? (
            <div className="mt-4">
              <Alert type="error">User Not Found!</Alert>
            </div>
          ) : (
            Object.keys(userInfo).length > 0 && (
              <Card className="mt-4" space={3} width={'100%'}>
                <Flex style={{ justifyContent: 'space-between' }} gap={8}>
                  <div className="flex justify-center gap-lg">
                    <Image className="rounded" width={150} height={150} src={userInfo.avatar_url} />
                    <div className="flex column gap-md justify-center">
                      <Link href={userInfo.html_url} passHref>
                        <a target={'_blank'}>
                          <Title style={{ fontSize: '1.3rem' }}>{userInfo.name}</Title>
                        </a>
                      </Link>
                      <Link href={userInfo.html_url} passHref>
                        <a target={'_blank'}>
                          <span>@{userInfo.login}</span>
                        </a>
                      </Link>
                      <span>{userInfo.location}</span>
                      <div className="flex gap-sm align-center">
                        {userInfo.twitter_username && (
                          <Link passHref href={`https://twitter.com/${userInfo.twitter_username}`}>
                            <a target={'_blank'}>
                              <TwitterIcon />
                            </a>
                          </Link>
                        )}
                        {userInfo.blog && (
                          <Link passHref href={`${userInfo.blog}`}>
                            <a target={'_blank'}>
                              <LinkIcon />
                            </a>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex column gap-sm justify-center mobile-none">
                    <span>
                      Followers: <span className="text-bold">{userInfo.followers}</span>
                    </span>
                    <span>
                      Following: <span className="text-bold">{userInfo.following}</span>
                    </span>
                    <span>
                      Public Repository:{' '}
                      <span className="text-bold">
                        {userRepoInfo.length >= 30 ? '30+' : userRepoInfo.length}
                      </span>
                    </span>
                  </div>
                </Flex>
                <hr className="mt-4 mb-4" />
                <Flex>
                  <div className="grid-container">
                    {userTogetherLanguages.map((item: any, index: number) => (
                      <div key={index} className="grid-item">
                        <span className="text-bold">{item.name}</span>
                        <span style={{ fontSize: '.9rem' }}>%{item.size}</span>
                      </div>
                    ))}
                  </div>
                </Flex>
              </Card>
            )
          )}
        </>
      )}
    </Container>
  )
}

export default Home
