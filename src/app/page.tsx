'use client'

import React, { useEffect, useState } from 'react'
import TodoDetail from '@/components/TodoDetail'
import ListTodos from '@/components/ListTodos'
import { Button, Center, Container, Flex, TextInput, Title } from '@mantine/core'
import Request from '@/utils/request'
import AddTodo from '@/components/AddTodo'
import useTokenCheck from '@/hooks/token-check.hook'
import { useRouter } from 'next/navigation'
import { Todo } from '@/types/todo.type'

const PAGE_SIZE = 2

const App = () => {
    const token = useTokenCheck()
    const [tokenVerified, setTokenVerified] = useState(false)
    const [addTodoModalOpened, setAddTodoModalOpened] = useState(false)
    const [todoDetailModalOpened, setTodoDetailModalOpened] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState<Todo>()
    const [todos, setTodos] = useState<Todo[]>([])
    const [searchText, setSearchText] = useState<string>('')
    const router = useRouter()
    const [totalTodoCount, setTotalTodoCount] = useState<number>(0)

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
        const loadTodos = async () => {
            await fetchTodos()
        }
        if (tokenVerified) loadTodos()
    }, [tokenVerified])

    useEffect(() => {
        const loadTodos = async () => {
            if (searchText == '') setTodos([])
            await fetchTodos()
        }
        if (searchText == '' || searchText.length >= 3) loadTodos()
    }, [searchText])

    const fetchTodos = async (page: number = 1, limit: number = PAGE_SIZE) => {
        const title = searchText.length >= 3 ? '&title=' + searchText : ''

        const response = await Request.get({
            endpoint: `/todos?page=${page}&limit=${limit}` + title,
            useToken: true
        })
        setTotalTodoCount(response.total)
        console.log(response)
        setTodos(response.data)
    }

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
                <ListTodos
                    todos={todos}
                    openTodoDetail={openTodoDetailModal}
                    total={totalTodoCount}
                    fetchTodos={fetchTodos}
                    PAGE_SIZE={PAGE_SIZE}
                />
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
