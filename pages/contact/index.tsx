import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'

import {
  Button,
  Container,
  Input,
  Textarea,
  Title,
  Alert,
  Card,
  FormErrorLabel,
  FormItem,
  FormLabel,
} from '../../components'

interface IFormInput {
  fullname: string
  email: string
  message: string
}

const Contact: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ mode: 'onSubmit' })

  const [isSubmit, setSubmit] = useState(false)

  const onSubmit: SubmitHandler<IFormInput> = () => {
    reset()
    setSubmit(true)
  }

  return (
    <Container>
      <Head>
        <title>Contact</title>
      </Head>
      <Card space={3}>
        <Title>Contact Form</Title>
        <div className="contact-form-container mt-4">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Input
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  {...register('fullname', {
                    required: { value: true, message: 'Fullname is required!' },
                  })}
                />
                {errors.fullname && <FormErrorLabel>{errors.fullname.message}</FormErrorLabel>}
              </FormItem>
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <Input
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
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
                <FormLabel>Messages</FormLabel>
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
              {isSubmit && (
                <Alert type="success">
                  Thanks! Your information has been saved. We will contact you as soon as possible
                </Alert>
              )}
            </form>
          </div>
          <div className="w-full">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis at, est, adipisci
              quae nam expedita ratione fugit quis ipsum qui dignissimos modi aliquam error aut
              veritatis laborum sed, animi maxime. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nihil eligendi ducimus unde possimus a voluptates, doloribus, minus
              molestias similique enim laboriosam harum quis. Tempora, quam vero. Eaque rem officia
              obcaecati. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas autem
              nesciunt libero. Eum fugit quasi, porro sequi delectus magni sed odio nulla incidunt
              illo, asperiores quo dolores vel neque! Reiciendis. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Amet nemo, fugit ab natus provident quidem odio
              doloremque voluptatibus veniam iusto eaque modi nisi, deleniti architecto nam adipisci
              harum necessitatibus fuga? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Omnis obcaecati, ex ipsam pariatur accusantium fugiat doloremque commodi a nisi odit
              rem laudantium saepe. Asperiores fugiat nihil natus nesciunt assumenda quisquam. Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Ipsum assumenda modi aliquid ipsa
              nesciunt amet soluta provident nostrum praesentium in, nihil, dicta at corporis
              temporibus error? Voluptas at corrupti fugit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </p>
          </div>
        </div>
      </Card>
    </Container>
  )
}

export default Contact
