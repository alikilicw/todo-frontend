import { Constants } from './constants'
import ReduxState from './redux-state'

export default class Request {
    private static getHeaders(useToken: boolean): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        }

        if (useToken) {
            headers['Authorization'] = 'Bearer ' + ReduxState.getToken()
        }

        return headers
    }

    public static async get({
        endpoint = '',
        useToken = true
    }: {
        endpoint?: string
        useToken?: boolean
    }) {
        const response = await fetch(Constants.BACKEND_URL + endpoint, {
            method: 'GET',
            headers: Request.getHeaders(useToken)
        })

        const result = await response.json()

        if (!response.ok) {
            console.log(result)
            console.log(Request.getHeaders(useToken))

            throw new Error(result.message || 'Failed to fetch user info')
        }

        return result
    }

    public static async post({
        body = {},
        endpoint = '',
        useToken = true
    }: {
        body: FormData | Record<string, any>
        endpoint?: string
        useToken?: boolean
    }) {
        const url = Constants.BACKEND_URL + endpoint

        const headers = new Headers(Request.getHeaders(useToken))
        let requestBody: BodyInit

        if (body instanceof FormData) {
            requestBody = body
            headers.delete('Content-Type')
        } else {
            headers.set('Content-Type', 'application/json')
            requestBody = JSON.stringify(body)
        }

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: requestBody
        })

        const result = await response.json()

        if (!response.ok) {
            console.log(result)
            throw new Error(result.message || 'Failed to post request.')
        }

        return result
    }

    public static async patch({
        body = {},
        endpoint = '',
        useToken = true
    }: {
        body: FormData | Record<string, any>
        endpoint?: string
        useToken?: boolean
    }) {
        const url = Constants.BACKEND_URL + endpoint

        const headers = new Headers(Request.getHeaders(useToken))
        let requestBody: BodyInit

        if (body instanceof FormData) {
            requestBody = body
            headers.delete('Content-Type')
        } else {
            headers.set('Content-Type', 'application/json')
            requestBody = JSON.stringify(body)
        }

        const response = await fetch(url, {
            method: 'PATCH',
            headers: headers,
            body: requestBody
        })

        const result = await response.json()

        if (!response.ok) {
            console.log(result)

            throw new Error(result.message || 'Failed to patch request.')
        }

        return result
    }

    public static async delete({
        endpoint = '',
        useToken = true
    }: {
        endpoint?: string
        useToken?: boolean
    }) {
        const response = await fetch(Constants.BACKEND_URL + endpoint, {
            method: 'DELETE',
            headers: Request.getHeaders(useToken)
        })

        if (!response.ok) {
            throw new Error('Failed to delete todo.')
        }
    }
}
