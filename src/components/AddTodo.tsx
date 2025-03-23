'use client'

import { useState } from 'react'
import {
    TextInput,
    FileInput,
    Button,
    Group,
    Image,
    Modal,
    Textarea,
    Text,
    ActionIcon,
    Loader
} from '@mantine/core'
import Request from '@/utils/request'

export type AddTodoProps = {
    opened: boolean
    onClose: any
    addNewTodo: Function
}

export default function AddTodo({ opened, onClose, addNewTodo }: AddTodoProps) {
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

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

    const handleSubmit = async () => {
        if (title != '') {
            setLoading(true)
            const formData = new FormData()

            formData.append('title', title)
            formData.append('description', description)
            if (thumbnail) {
                formData.append('thumbnail', thumbnail)
            }
            if (file) {
                formData.append('file', file)
            }

            const response = await Request.post({
                body: formData,
                endpoint: '/todos',
                useToken: true
            })

            addNewTodo(response)
            setLoading(false)
        }

        onClose()
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Add Todo" centered>
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
                accept=".pdf,.doc,.docx,.xlsx"
                placeholder="Upload a file"
                onChange={setFile}
            />

            <Group mt="md">
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? <Loader size="xs" /> : 'Add Todo'}
                </Button>
            </Group>
        </Modal>
    )
}
