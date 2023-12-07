import React, { useState } from 'react'
import Question from '../Questions/Question'
import { useSelector, useDispatch } from 'react-redux';
import { formActions } from '../../../store/slice/form';
import axios from 'axios'
const CreateForm = () => {
    const [formData, setFormData] = useState({
        headerImg: '',
        title: '',
        questions: [{ id: 1 }],
    });
    const dispatch = useDispatch()
    const allQuestions = useSelector((state) => state.question.allQuestions)

    const addQuestion = () => {
        const newQuestions = [...formData.questions, { id: formData.questions.length + 1 }];
        setFormData({ ...formData, questions: newQuestions });
    };

    const deleteQuestion = (id) => {
        if (formData.questions.length > 1) {
            const updatedQuestions = formData.questions.filter((question) => question.id !== id);
            setFormData({ ...formData, questions: updatedQuestions });
        }
    };

    const handleHeaderImageChange = (e) => {
        setFormData({ ...formData, headerImg: e.target.value });
    };

    const handleTitleChange = (e) => {
        setFormData({ ...formData, title: e.target.value });
    };

    const saveForm = () => {
        const data = {
            title: formData.title,
            img: formData.headerImg,
            allQuestions: allQuestions
        }
        dispatch(formActions.handleForm(data))

    }
    const createForm = async () => {
        try {
            const data = {
                title: formData.title,
                headerImg: formData.headerImg,
                allQuestions: allQuestions
            }

            console.log('Form>>>',data  )

            const response = await axios.post('http://localhost:4000/form/create-form', data)
            console.log(response)

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div >

            <div className='flex flex-col  mt-6'>
                <div className="col-span-full ">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Header Image
                    </label>
                    <div className="  mt-2 flex justify-center rounded-lg border block w-full border-dashed border-gray-900/25 px-6 py-10  ">
                        <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleHeaderImageChange}
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="w-full col-span-full mt-4">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Title
                    </label>
                    <div className="mt-2 ">
                        <input
                            type="text"
                            name="title"
                            id="tiltle"
                            autoComplete="title"
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleTitleChange}
                        />
                    </div>
                </div>
            </div>


            <div>

                {formData.questions.map((question, index) => (
                    <div key={question.id}>
                        <p className="font-semibold">Question {index + 1}</p>
                        <Question />
                        {formData.questions.length > 1 && (
                            <button
                                onClick={() => deleteQuestion(question.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
                            >
                                Delete Question
                            </button>
                        )}
                    </div>
                ))}

                <button
                    onClick={addQuestion}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Question
                </button>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={createForm}
                >
                    Save Form
                </button>
            </div>


        </div>
    )
}

export default CreateForm
