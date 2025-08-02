export interface SharedState{
    isLoading: boolean,
    errorMessage: string
}

export const initialState: SharedState = {
    isLoading: false,
    errorMessage: ''
}