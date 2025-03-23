import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'

export type DynamicState = {
    storage: {
        [key: string]: any
    }
}

const initialState: DynamicState = {
    storage: {}
}

const shortTermStorage = createSlice({
    name: 'dynamic',
    initialState,
    reducers: {
        setKey: (state, action: PayloadAction<{ key: string; value: string }>) => {
            const { key, value } = action.payload

            state.storage[key] = value
        },
        removeKey: (state, action: PayloadAction<string>) => {
            const key = action.payload
            delete state.storage[key]
        }
    }
})

export const { setKey, removeKey } = shortTermStorage.actions

const store = configureStore({
    reducer: {
        dynamic: shortTermStorage.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
