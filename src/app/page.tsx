'use client'

import React, { useEffect, useState } from 'react'
import TodoDetail from '@/components/TodoDetail'
import ListTodos, { Todo } from '@/components/ListTodos'
import { Button, Center, Container, Flex, TextInput, Title } from '@mantine/core'
import Request from '@/utils/request'
import AddTodo from '@/components/AddTodo'
import useTokenCheck from '@/hooks/token-check.hook'
import { useRouter } from 'next/navigation'

const App = () => {
    const token = useTokenCheck()
    const [tokenVerified, setTokenVerified] = useState(false)
    const [addTodoModalOpened, setAddTodoModalOpened] = useState(false)
    const [todoDetailModalOpened, setTodoDetailModalOpened] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState<Todo>()
    const [todos, setTodos] = useState<Todo[]>([])
    const [searchText, setSearchText] = useState<string>('')
    const router = useRouter()

    useEffect(() => {
        const verifyToken = async () => {
            if (token == 'invalid') {
                router.push('/auth/login')
            } else {
                setTokenVerified(true)
            }
        }
        if (token != 'unset') verifyToken()
    }, [token])

    useEffect(() => {
        const a = async () => {
            let searchQuery: string = ''
            if (searchText.length >= 3) searchQuery = '?title=' + searchText

            if (searchText == '' || searchQuery != '') {
                const todos = await Request.get({
                    endpoint: '/todos' + searchQuery,
                    useToken: true
                })
                setTodos(todos)
            } else {
                setTodos([])
            }
        }
        if (tokenVerified) a()
    }, [searchText, tokenVerified])

    const addNewTodo = (todo: Todo) => {
        console.log(todo)

        setTodos((prevTodos) => [todo, ...prevTodos])
    }

    const updateATodo = (todo: Todo) => {
        console.log(todo)

        setTodos((prevTodos) => prevTodos.map((t) => (t._id === todo._id ? { ...t, ...todo } : t)))
    }

    const deleteATodo = (todo: Todo) => {
        console.log(todo)
        setTodos((prevTodos) => prevTodos.filter((t) => t._id != todo._id))
    }

    const openAddTodoModal = () => {
        setAddTodoModalOpened(true)
    }

    const closeAddTodoModal = () => {
        setAddTodoModalOpened(false)
    }

    const openTodoDetailModal = (todo: Todo) => {
        setSelectedTodo(todo)
        setTodoDetailModalOpened(true)
    }

    const closeTodoDetailModal = () => {
        setTodoDetailModalOpened(false)
    }

    return (
        <div>
            <Container size="sm" mt="lg">
                <Title ta="center" mb="lg">
                    Todo List
                </Title>
                <Flex justify="space-between" mx="md">
                    <Button variant="filled" mb="sm" onClick={openAddTodoModal}>
                        Add Todo
                    </Button>
                    <TextInput
                        placeholder="Search Todo By Title"
                        value={searchText}
                        onChange={(event) => setSearchText(event.currentTarget.value)}
                    />
                </Flex>
                <ListTodos todos={todos} openTodoDetail={openTodoDetailModal} />
                <Center mt={50}>{todos.length == 0 && <p>Add Todo To Start</p>}</Center>
                <AddTodo
                    opened={addTodoModalOpened}
                    onClose={closeAddTodoModal}
                    addNewTodo={addNewTodo}
                />
                <TodoDetail
                    todo={selectedTodo}
                    opened={todoDetailModalOpened}
                    onClose={closeTodoDetailModal}
                    updateTodo={updateATodo}
                    deleteTodo={deleteATodo}
                />
            </Container>
        </div>
    )
}

export default App
