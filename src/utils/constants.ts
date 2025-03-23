export type TConstants = {
    BACKEND_URL: string
}

export const Constants: TConstants = {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string
}
