'use client'

import { useState } from 'react'
import { Card, Image, Text, Title, Pagination, Container, Grid, Group } from '@mantine/core'
import TodoDetail from './TodoDetail'

export type Todo = {
    id: number
    title: string
    description: string
    thumbnailKey: string
}

const PAGE_SIZE = 5

export type TodoListProps = {
    todos: Todo[]
}

export default function TodoList({ todos }: TodoListProps) {
    const [activePage, setActivePage] = useState(1)

    const startIdx = (activePage - 1) * PAGE_SIZE
    const displayedTodos = todos.slice(startIdx, startIdx + PAGE_SIZE)

    return (
        <Container size="sm">
            <Grid>
                {displayedTodos.map((todo) => (
                    <Grid.Col span={12} key={todo.id}>
                        <Card shadow="md" padding="sm" radius="md" withBorder>
                            <Group justify="space-between" align="center">
                                <div>
                                    <Title order={3}>{todo.title}</Title>
                                    <Text size="sm" mt="xs">
                                        {todo.description}
                                    </Text>
                                </div>
                                <Image
                                    src={todo.thumbnailKey}
                                    width={70}
                                    height={70}
                                    alt={todo.title}
                                    radius="md"
                                />
                            </Group>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
            <Pagination
                total={Math.ceil(todos.length / PAGE_SIZE)}
                value={activePage}
                onChange={setActivePage}
                mt="lg"
            />
        </Container>
    )
}
