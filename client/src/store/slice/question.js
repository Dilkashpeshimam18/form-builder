import { createSlice } from '@reduxjs/toolkit'

export const initialQuestionState = {
    question:[ ],

    allQuestions: [],

}


const QuestionSlice = createSlice({
    name: 'question',
    initialState: initialQuestionState,
    reducers: {
        handleAddQuestion(state, action) {
            state.question.push(action.payload)

            state.allQuestions.push(action.payload)

        }

    }
})



export const questionActions = QuestionSlice.actions
export default QuestionSlice.reducer