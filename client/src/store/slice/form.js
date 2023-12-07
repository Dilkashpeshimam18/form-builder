import { createSlice } from '@reduxjs/toolkit'

export const initialFormState = {
    title: '',
    headerImg: '',
    questions: [],

};


const FormSlice = createSlice({
    name: 'form',
    initialState: initialFormState,
    reducers: {
        handleForm(state, action) {
            state.title = action.payload.title
            state.headerImg = action.payload.img
            state.questions=action.payload.allQuestions
        }

    }
})



export const formActions = FormSlice.actions
export default FormSlice.reducer