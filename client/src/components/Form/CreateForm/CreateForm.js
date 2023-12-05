import React, { useState } from 'react'
import Question from '../Questions/Question'

const CreateForm = () => {
    const [questions, setQuestions] = useState([{ id: 1 }]);

    const addQuestion = () => {
        const newQuestions = [...questions, { id: questions.length + 1 }];
        setQuestions(newQuestions);
    };
    const deleteQuestion = (id) => {
        if (questions.length > 1) {
            const updatedQuestions = questions.filter((question) => question.id !== id);
            setQuestions(updatedQuestions);
        }
    };
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
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
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
                            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                </div>
            </div>


            <div>
                {questions.map((question,index) => (
                    <div key={question.id}>
                    <p className="font-semibold">Question {index + 1}</p>

                        <Question />
                        {questions.length > 1 &&  (
                            <button
                                onClick={() => deleteQuestion(question.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
                            >
                                Delete Question
                            </button>
                        )}
                    </div>
                ))}

                {/* Button to add more questions */}
                <button
                    onClick={addQuestion}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Question
                </button>            </div>


        </div>
    )
}

export default CreateForm
