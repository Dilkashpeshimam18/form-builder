import { configureStore } from "@reduxjs/toolkit";
import questionReducer from './slice/question'

const store = configureStore({
    reducer: {
        question: questionReducer
    }
})

export default store