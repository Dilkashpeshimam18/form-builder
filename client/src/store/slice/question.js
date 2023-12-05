import { createSlice } from '@reduxjs/toolkit'

export const initialQuestionState = {
    questionType: 'Categorize'
}


const QuestionSlice = createSlice({
    name: 'question',
    initialState: initialQuestionState,
    reducers: {
        handleQuestionType(state, action) {
            state.questionType = action.payload
        }

    }
})



export const questionActions = QuestionSlice.actions
export default QuestionSlice.reducer