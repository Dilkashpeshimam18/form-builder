import { configureStore } from "@reduxjs/toolkit";
import questionReducer from './slice/question'
import formReducer from './slice/form'

const store = configureStore({
    reducer: {
        question: questionReducer,
        form: formReducer
    }
})

export default store