'use client'

import { useState } from 'react'
import { Card, Image, Text, Title, Pagination, Container, Grid, Group, Flex } from '@mantine/core'
import { Constants } from '@/utils/constants'
import { Todo } from '@/types/todo.type'

const PAGE_SIZE = 5

export type TodoListProps = {
    todos: Todo[]
    openTodoDetail: Function
}

export default function TodoList({ todos, openTodoDetail }: TodoListProps) {
    const [activePage, setActivePage] = useState(1)

    const startIdx = (activePage - 1) * PAGE_SIZE
    const displayedTodos = todos.slice(startIdx, startIdx + PAGE_SIZE)

    return (
        <Container size="sm">
            <Pagination
                total={Math.ceil(todos.length / PAGE_SIZE)}
                value={activePage}
                onChange={setActivePage}
                mb="lg"
                mt="lg"
            />
            <Grid>
                {displayedTodos.map((todo, index) => (
                    <Grid.Col span={12} key={index}>
                        <Card
                            shadow="md"
                            padding="sm"
                            radius="md"
                            withBorder
                            style={{ cursor: 'pointer' }}
                            onClick={() => openTodoDetail(todo)}
                        >
                            <Flex justify="space-between" align="center">
                                <div>
                                    <Title order={3}>{todo.title}</Title>
                                    <Text size="sm" mt="xs">
                                        {todo.description}
                                    </Text>
                                </div>
                                {todo.thumbnailKey && (
                                    <Image
                                        src={`${Constants.BACKEND_URL}/files?fileKey=${todo.thumbnailKey}`}
                                        width={100}
                                        height={100}
                                        alt={todo.title}
                                        radius="md"
                                    />
                                )}
                            </Flex>
                            <Title order={5}>AI Suggestions</Title>
                            <Text size="sm" mt="xs" style={{ whiteSpace: 'pre-wrap' }}>
                                {todo.recommendations}
                            </Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}
