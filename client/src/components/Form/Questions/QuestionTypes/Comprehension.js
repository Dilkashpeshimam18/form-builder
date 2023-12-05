import React, { useState } from 'react'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux'
import { questionActions } from '../../../../store/slice/question';

const Comprehension = () => {
  const [question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [passage, setPassage] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const dispatch = useDispatch()

  const handleOptionChange = (index) => {
    setCorrectAnswer(index);
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <div key={index}>
        <input
          type="radio"
          name="correctAnswer"
          value={option}
          checked={correctAnswer === index}
          onChange={() => handleOptionChange(index)}
        />
        <input
          type="text"
          value={option}
          onChange={(e) => {
            const updatedOptions = [...options];
            updatedOptions[index] = e.target.value;
            setOptions(updatedOptions);
          }}
        />
      </div>
    ));
  };

  return (
    <div className='flex flex-col mt-5'>
      <div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Passage
            </label>
            <div className="mt-2">
              <input
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
                type="text"
                id="comprehension"
                placeholder='Type your passage'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        </div>
      </div>

      <div>
        <h3>Question</h3>
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              placeholder='Enter title'
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Question
          </label>
          <div className="mt-2">
            <input
              value={title}
              onChange={(e) => setQuestion(e.target.value)}
              type="text"
              id="title"
              placeholder='Enter question'
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label>
            Options:
            {renderOptions()}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Comprehension