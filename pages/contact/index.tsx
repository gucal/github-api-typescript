import type { NextPage } from 'next'
import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Button, Container, Input, Title } from '../../components/UI/style'
import Card from '../../components/Card'
import { FormErrorLabel, FormItem, FormLabel } from '../../components/Form'

interface IFormInput {
  fullname: string
  email: string
  message: string
}

const Contact: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <Container>
      <Head>
        <title>Contact</title>
      </Head>
      <Card space={3}>
        <Title>Contact Form</Title>
        <form style={{ marginTop: 36 }} onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel>Fullname:</FormLabel>
            <Input {...register('fullname', { required: true })} />
            {errors.fullname && <FormErrorLabel>Username is required</FormErrorLabel>}
          </FormItem>
          <FormItem>
            <FormLabel>Email:</FormLabel>
            <Input {...register('email', { required: true })} />
            {errors.email && <FormErrorLabel>Email is required</FormErrorLabel>}
          </FormItem>
          <FormItem>
            <FormLabel>Messages:</FormLabel>
            <Input {...register('message', { required: true })} type="textarea" />
            {errors.message && <FormErrorLabel>Message is required</FormErrorLabel>}
          </FormItem>
          <FormItem>
            <Button type="submit" block>
              Submit
            </Button>
          </FormItem>
        </form>
      </Card>
    </Container>
  )
}

export default Contact
