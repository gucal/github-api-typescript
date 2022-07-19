import { useContext } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import AuthContext from '../../context/AuthenticationContext/store'
import Card from '../../components/Card'
import { FormItem, FormLabel, FormErrorLabel } from '../../components/Form'
import { Container, Flex, Input, Button, Title } from '../../components/UI/style'

type FormData = {
  username: string
  password: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const { dispatch } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(() => {
    dispatch({
      type: 'LOGIN',
    })
    router.push(`/`)
  })

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <Flex style={{ marginTop: '4rem' }}>
        <Card width={'400px'} space={3}>
          <Title>Login</Title>
          <form style={{ marginTop: 36 }} onSubmit={onSubmit}>
            <FormItem>
              <FormLabel>Username:</FormLabel>
              <Input {...register('username', { required: true })} />
              {errors.username && <FormErrorLabel>Username is required</FormErrorLabel>}
            </FormItem>
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <Input {...register('password', { required: true })} type="password" />
              {errors.password && <FormErrorLabel>Password is required</FormErrorLabel>}
            </FormItem>
            <FormItem>
              <Button type="submit" block>
                Login
              </Button>
            </FormItem>
          </form>
        </Card>
      </Flex>
    </Container>
  )
}

export default Login
