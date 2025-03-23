import store, { DynamicState } from '@/store/store'

export default class ReduxState {
    public static getToken(): string {
        const state = store.getState().dynamic

        return state.storage.authToken || null
    }
}
