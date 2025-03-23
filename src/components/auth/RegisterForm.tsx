import { useShortTermStorage } from '@/hooks/store.hook'
import Request from '@/utils/request'
import { TextInput, PasswordInput, Button, Box, Loader, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export type RegisterForm = {
    username: string
    email: string
    password: string
}

export default function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const { setKeyValue } = useShortTermStorage()
    const router = useRouter()
    const form = useForm<RegisterForm>({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },

        validate: {
            username: (value) =>
                value.length < 3 ? 'Username must be at least 3 characters' : null,
            email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                value.length < 6 ? 'Password must be at least 6 characters' : null
        }
    })

    const handleRegister = async (values: RegisterForm) => {
        console.log('Register Form', values)

        try {
            setLoading(true)
            const response = await Request.post({
                body: values,
                endpoint: '/auth/register',
                useToken: false
            })

            console.log('Register Successfull.')

            localStorage.setItem('authToken', response.data.token)

            setKeyValue('authToken', response.data.token)

            router.push('/auth/confirm')
        } catch (error) {
            console.log('Register Error', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box maw={400} mx="auto">
            <form onSubmit={form.onSubmit((values) => handleRegister(values))}>
                <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    {...form.getInputProps('username')}
                />
                <TextInput
                    mt="sm"
                    label="Email"
                    placeholder="Enter your email"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    mt="sm"
                    label="Password"
                    placeholder="Enter your password"
                    {...form.getInputProps('password')}
                />

                <Group mt="md" justify="space-between">
                    <Button type="submit" disabled={loading}>
                        {loading ? <Loader size="xs" /> : 'Register'}
                    </Button>
                    <Button onClick={() => router.push('/auth/login')}>Login</Button>
                </Group>
            </form>
        </Box>
    )
}
