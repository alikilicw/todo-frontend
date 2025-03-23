'use client'

import { useShortTermStorage } from '@/hooks/store.hook'
import Request from '@/utils/request'
import { TextInput, PasswordInput, Button, Box, PinInput, Text, Loader } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ConfirmCode() {
    const [loading, setLoading] = useState(false)
    const { deleteKey } = useShortTermStorage()
    const router = useRouter()
    const [timer, setTimer] = useState(150)

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    const form = useForm({
        initialValues: {
            code: ''
        }
    })

    const handleConfirmFormSubmit = async (code: string) => {
        console.log(code)

        try {
            const response = await Request.get({ endpoint: '/auth/confirm?code=' + code })

            console.log('Code Confirmed')

            setLoading(true)
            deleteKey('authToken')
            localStorage.removeItem('authToken')
            setTimeout(() => {
                router.push('/auth/login')
                setLoading(false)
            }, 2000)
        } catch (error) {
            console.log('Confirm Error', error)
        }
    }

    return (
        <Box maw={400} mx="auto">
            <form onSubmit={form.onSubmit((values) => handleConfirmFormSubmit(values.code))}>
                <PinInput length={4} size="md" {...form.getInputProps('code')} />
                <Button mt="md" type="submit" disabled={loading}>
                    {loading ? <Loader size="xs" /> : 'Confirm Code'}
                </Button>
            </form>
            <Text mt="sm" ta="center">
                {`Time left ${timer}s`}
            </Text>
        </Box>
    )
}
