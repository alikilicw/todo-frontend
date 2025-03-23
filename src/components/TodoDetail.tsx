'use client'

import { useEffect, useState } from 'react'
import { TextInput, FileInput, Button, Group, Image, Modal, Textarea } from '@mantine/core'
import { Todo } from './ListTodos'
import { Constants } from '@/utils/constants'
import Request from '@/utils/request'

export type TodoDetailProps = {
    todo: Todo | undefined
    opened: boolean
    onClose: any
    updateTodo: Function
    deleteTodo: Function
}

export default function TodoDetail({
    todo,
    opened,
    onClose,
    updateTodo,
    deleteTodo
}: TodoDetailProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [filePath, setFilePath] = useState<string>('null')
    const [fileName, setFileName] = useState<string>('null')
    const [preview, setPreview] = useState<string | null>(null)

    useEffect(() => {
        setTitle(todo?.title!)
        setDescription(todo?.description!)
        setPreview(`${Constants.BACKEND_URL}/files?fileKey=${todo?.thumbnailKey!}`)
        if (!todo?.thumbnailKey) setPreview(null)
        if (todo?.fileKey) setFilePath(`${Constants.BACKEND_URL}/files?fileKey=${todo?.fileKey}`)
        if (!todo?.fileKey) setFilePath('')
        if (todo?.fileKey) setFileName(todo?.fileKey.split('/')[1])
        if (!todo?.fileKey) setFileName('')
    }, [todo])

    const handleThumbnailChange = (file: File | null) => {
        setThumbnail(file)
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)
        } else {
            setPreview(null)
        }
    }

    const handleFileChange = (file: File | null) => {
        setFile(file)

        if (file) {
            const fileUrl = URL.createObjectURL(file)
            setFilePath(fileUrl)
            setFileName(file.name)
        }
    }

    const handleUpdate = async () => {
        const formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)

        if (thumbnail) {
            formData.append('thumbnail', thumbnail)
        }
        if (file) {
            formData.append('file', file)
        }

        const response = await Request.patch({
            body: formData,
            endpoint: '/todos/' + todo!._id,
            useToken: false
        })

        updateTodo(response)

        onClose()
    }

    const handleDelete = async () => {
        await Request.delete({
            endpoint: '/todos/' + todo!._id,
            useToken: false
        })

        deleteTodo(todo)

        onClose()
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Todo Detail" centered>
            <TextInput
                label="Todo Title"
                placeholder="Enter todo title"
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
            />

            <Textarea
                label="Todo Description"
                placeholder="Enter todo description"
                value={description}
                onChange={(event) => setDescription(event.currentTarget.value)}
            />

            <FileInput
                label="Thumbnail Image"
                placeholder="Upload an image"
                accept="image/*"
                onChange={handleThumbnailChange}
            />
            {preview && <Image src={preview} alt="Thumbnail Preview" width={100} mt={10} />}

            <FileInput
                label="Attach File"
                placeholder="Upload a file"
                onChange={handleFileChange}
            />

            {filePath ? (
                <a href={filePath} target="_blank">
                    <Button mt="md">Open {fileName}</Button>
                </a>
            ) : (
                <p></p>
            )}

            <Group mt="md" justify="space-evenly">
                <Button onClick={handleUpdate}>Update Todo</Button>
                <Button onClick={handleDelete} color="red">
                    Delete Todo
                </Button>
            </Group>
        </Modal>
    )
}
