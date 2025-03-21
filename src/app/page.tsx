'use client'

import React, { useState } from 'react'
import TodoDetail from '@/components/TodoDetail'
import ListTodos, { Todo } from '@/components/ListTodos'
import { Button, Container, Title } from '@mantine/core'

const todos: Todo[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Todo ${i + 1}`,
    description: `This is the description for todo ${i + 1}.`,
    thumbnailKey: `https://www.sozialuniversity.com/api/image?key=post-files/alikilic/post-2024-04-06T13-21-06-537Z/536983548.png`
}))

const App = () => {
    const [addTodoModalOpened, setAddTodoModalOpened] = useState(false)

    const openAddTodoModal = () => {
        setAddTodoModalOpened(true)
    }

    const closeAddTodoModal = () => {
        setAddTodoModalOpened(false)
    }

    return (
        <div>
            <Container size="sm">
                <Title ta="center" mb="lg">
                    Todo List
                </Title>
                <Container>
                    <Button variant="filled" mb="sm" onClick={openAddTodoModal}>
                        Add Todo
                    </Button>
                </Container>
                <ListTodos todos={todos} />
                <TodoDetail opened={addTodoModalOpened} onClose={closeAddTodoModal} />
            </Container>
        </div>
    )
}

export default App
