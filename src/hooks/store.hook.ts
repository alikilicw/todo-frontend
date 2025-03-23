import { AppDispatch, removeKey, RootState, setKey } from '@/store/store'
import { useSelector, useDispatch } from 'react-redux'

export const useShortTermStorage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const shortTermStorage = useSelector((state: RootState) => state.dynamic)

    const getKeyValue = (key: string): string => {
        return shortTermStorage.storage[key]
    }

    const setKeyValue = (key: string, value: string) => {
        dispatch(setKey({ key, value }))
    }

    const deleteKey = (key: string) => {
        dispatch(removeKey(key))
    }

    return { shortTermStorage, getKeyValue, setKeyValue, deleteKey }
}
