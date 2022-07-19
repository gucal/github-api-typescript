import { MutableRefObject, useRef, useContext, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Card from '../components/Card'
import { Button, Container, Flex, Input, Title } from '../components/UI/style'
import Spin from '../components/Icons/Spin'
import TwitterIcon from '../components/Icons/Twitter'
import LinkIcon from '../components/Icons/Link'
import UserContext from '../context/UserContext/store'
import { getUserInfo } from '../services/users/getUserInfo'
import AuthContext from '../context/AuthenticationContext/store'
import Alert from '../components/Alert'

const Home: NextPage = () => {
  const { state, dispatch } = useContext(UserContext)
  const authState = useContext(AuthContext).state

  const isLoading: any = state.isLoading
  const userInfo: any = state.userInfo
  const userRepoInfo: any = state.userRepositories
  const userTogetherLanguages: any = state.userTogetherLanguages
  const isUserError: any = state.isUserError

  const userNameInputRef = useRef() as MutableRefObject<HTMLInputElement>

  const router = useRouter()

  const submitClick = async () => {
    const inputValue = userNameInputRef.current.value.trim().toLowerCase()
    await getUserInfo(inputValue, dispatch)
  }

  useEffect(() => {
    if (!authState.isLogin) {
      router.push('/login')
    }
  }, [])

  return (
    <Container>
      <Head>
        <title>Github User Information</title>
      </Head>
      <Flex gap={12}>
        <Input
          defaultValue={userInfo.login}
          block
          ref={userNameInputRef}
          placeholder="Enter username"
        />
        <Button style={{ minWidth: '100px' }} onClick={submitClick}>
          Search User
        </Button>
      </Flex>

      {isLoading ? (
        <div className="mt-4">
          <Spin />
        </div>
      ) : isUserError ? (
        <div className="mt-4">
          <Alert>User Not Found!</Alert>
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
    </Container>
  )
}

export default Home
