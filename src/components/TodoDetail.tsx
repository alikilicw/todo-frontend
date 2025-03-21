'use client'

import { useState } from 'react'
import { TextInput, FileInput, Button, Group, Image, Modal, Textarea } from '@mantine/core'

export type TodoDetailProps = {
    opened: boolean
    onClose: any
}

export default function TodoDetail({ opened, onClose }: TodoDetailProps) {
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

    const handleSubmit = () => {
        console.log('Todo Added')
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

            <FileInput label="Attach File" placeholder="Upload a file" onChange={setFile} />

            <Group mt="md">
                <Button onClick={handleSubmit}>Add Todo</Button>
            </Group>
        </Modal>
    )
}
