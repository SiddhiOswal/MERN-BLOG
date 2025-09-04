import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.currentUser = null;
            state.error = action.payload;
        },
        signOutSuccess: (state, action) => {
            state.currentUser =  null;
            state.error = null;
        },
        signOutFailure: (state, action) => {
            state.error = action.payload;
        },
        userDeleteSuccess: (state, action) => {
            state.currentUser = null;
            state.error = null;
        },
        userDeleteFailure: (state, action) =>{
            state.error = action.payload;
        },
    },
});


export const { 
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    userDeleteFailure,
    userDeleteSuccess
} = userSlice.actions

export default userSlice.reducer