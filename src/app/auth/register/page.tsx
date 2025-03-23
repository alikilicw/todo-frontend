'use client'

import RegisterForm from '@/components/auth/RegisterForm'
import { Container, Title } from '@mantine/core'
import React from 'react'

const Register = () => {
    return (
        <div>
            <Container size="sm" mt="lg">
                <Title ta="center" mb="lg">
                    Register
                </Title>
                <RegisterForm />
            </Container>
        </div>
    )
}

export default Register
