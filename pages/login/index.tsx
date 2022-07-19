import { useContext } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

import {
  Container,
  Flex,
  Input,
  Button,
  Title,
  Card,
  FormItem,
  FormLabel,
  FormErrorLabel,
} from '../../components'
import AuthContext from '../../context/AuthenticationContext/store'

interface IFormData {
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
  } = useForm<IFormData>()

  const onSubmit: SubmitHandler<IFormData> = () => {
    dispatch({
      type: 'LOGIN',
    })
    router.push(`/`)
  }

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <Flex style={{ marginTop: '4rem' }}>
        <Card width={'400px'} space={3}>
          <Title>Login</Title>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel>Username</FormLabel>
              <Input
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                {...register('username', { required: true })}
              />
              {errors.username && <FormErrorLabel>Username is required</FormErrorLabel>}
            </FormItem>
            <FormItem>
              <FormLabel>Password</FormLabel>
              <Input
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                {...register('password', { required: true })}
                type="password"
              />
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
