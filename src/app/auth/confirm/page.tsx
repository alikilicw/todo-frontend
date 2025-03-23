'use client'

import ConfirmCode from '@/components/auth/ConfirmCodeForm'
import { Container, Title } from '@mantine/core'
import React from 'react'

const Confirm = () => {
    return (
        <div>
            <Container size="sm" mt="lg">
                <Title ta="center" mb="lg">
                    Confirm Code
                </Title>
                <ConfirmCode />
            </Container>
        </div>
    )
}

export default Confirm
