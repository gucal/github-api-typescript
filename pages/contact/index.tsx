import type { NextPage } from 'next'
import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Button, Container, Input, Textarea, Title } from '../../components/UI/style'
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
  } = useForm<IFormInput>({ mode: 'onSubmit' })

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <Container>
      <Head>
        <title>Contact</title>
      </Head>
      <Card space={3}>
        <Title>Contact Form</Title>

        <form style={{ marginTop: 36, width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel>Fullname:</FormLabel>
            <Input
              {...register('fullname', {
                required: { value: true, message: 'Fullname is required!' },
              })}
            />
            {errors.fullname && <FormErrorLabel>{errors.fullname.message}</FormErrorLabel>}
          </FormItem>
          <FormItem>
            <FormLabel>Email:</FormLabel>
            <Input
              {...register('email', {
                required: { value: true, message: 'Email is required!' },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address!',
                },
              })}
            />
            {errors.email && <FormErrorLabel>{errors.email.message}</FormErrorLabel>}
          </FormItem>
          <FormItem>
            <FormLabel>Messages:</FormLabel>
            <Textarea
              rows="3"
              {...register('message', {
                required: { value: true, message: 'Fullname is required!' },
              })}
              type="textarea"
            />
            {errors.message && <FormErrorLabel>{errors.message.message}</FormErrorLabel>}
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
