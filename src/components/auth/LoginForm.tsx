'use client'

import { useShortTermStorage } from '@/hooks/store.hook'
import useTokenCheck from '@/hooks/token-check.hook'
import Request from '@/utils/request'
import { TextInput, PasswordInput, Button, Box, Loader, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export type RegisterForm = {
    username: string
    password: string
}

export default function LoginForm() {
    const token = useTokenCheck()
    const [loading, setLoading] = useState(false)
    const { setKeyValue } = useShortTermStorage()
    const router = useRouter()
    const form = useForm<RegisterForm>({
        initialValues: {
            username: '',
            password: ''
        },

        validate: {
            username: (value) =>
                value.length < 3 ? 'Username must be at least 3 characters' : null,
            password: (value) =>
                value.length < 6 ? 'Password must be at least 6 characters' : null
        }
    })

    useEffect(() => {
        const verifyToken = async () => {
            if (token != 'invalid') {
                router.push('/')
            }
        }
        if (token != 'unset') verifyToken()
    }, [token])

    const handleLogin = async (values: RegisterForm) => {
        console.log('Login Form', values)

        try {
            setLoading(true)
            const response = await Request.post({
                body: values,
                endpoint: '/auth/login'
            })

            console.log('Login Successfull.')

            localStorage.setItem('authToken', response.data.token)

            setKeyValue('authToken', response.data.token)
            setKeyValue('currentUser', response.data.user)

            router.push('/')
        } catch (error) {
            console.log('Login Error', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box maw={400} mx="auto">
            <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
                <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    {...form.getInputProps('username')}
                />
                <PasswordInput
                    mt="sm"
                    label="Password"
                    placeholder="Enter your password"
                    {...form.getInputProps('password')}
                />

                <Group mt="md" justify="space-between">
                    <Button type="submit" disabled={loading}>
                        {loading ? <Loader size="xs" /> : 'Login'}
                    </Button>
                    <Button onClick={() => router.push('/auth/register')}>Register</Button>
                </Group>
            </form>
        </Box>
    )
}
