import { useShortTermStorage } from '@/hooks/store.hook'
import Request from '@/utils/request'
import { useEffect, useState } from 'react'

type Token = string | 'unset' | 'invalid'

const useTokenCheck = (): Token => {
    const { getKeyValue, setKeyValue, deleteKey } = useShortTermStorage()
    const [token, setToken] = useState<Token>('unset')

    useEffect(() => {
        const tokenCheck = async () => {
            let token
            const tokenFromRedux = getKeyValue('authToken')
            if (tokenFromRedux) token = tokenFromRedux
            else {
                const tokenFromLocalStorage = localStorage.getItem('authToken')
                if (tokenFromLocalStorage) {
                    token = tokenFromLocalStorage
                    setKeyValue('authToken', token)
                }
            }

            if (!token) setToken('invalid')
            else if (!getKeyValue('currentUser')) {
                console.log('whoami check')

                try {
                    const response = await Request.get({ endpoint: '/auth/whoami' })

                    setKeyValue('currentUser', response.data)
                    setToken(token)
                } catch (error) {
                    setToken('invalid')
                    deleteKey('authToken')
                    localStorage.removeItem('authToken')
                    console.error('Error during fetch:', error)
                }
            } else setToken(token)
        }
        tokenCheck()
    }, [])

    return token
}

export default useTokenCheck
