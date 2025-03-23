'use client'

import LoginForm from '@/components/auth/LoginForm'
import { Container, Title } from '@mantine/core'
import React from 'react'

const Login = () => {
    return (
        <div>
            <Container size="sm" mt="lg">
                <Title ta="center" mb="lg">
                    Login
                </Title>
                <LoginForm />
            </Container>
        </div>
    )
}

export default Login
