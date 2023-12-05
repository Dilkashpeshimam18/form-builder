import React, { useState } from 'react'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { questionActions } from '../../../../store/slice/question';
import {  useDispatch } from 'react-redux'

const Cloze = () => {
  const [question, setQuestion] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const dispatch=useDispatch()

   const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText !== '') {
      setSelectedText(selectedText);
    }
  };

  const handleOptionChange = (index) => {
    setCorrectAnswer(index);
  };

  const renderQuestion = () => {
    if (!selectedText) {
      return question;
    }

    const parts = question.split(selectedText);
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index !== parts.length - 1 && (
          <u style={{ textDecoration: 'underline' }}>{selectedText}</u>
        )}
      </React.Fragment>
    ));
  };

  const renderQuestionWithBlanks = () => {
    if (!selectedText) {
      return question;
    }

    const parts = question.split(selectedText);
    const underscoreCount = selectedText.length;
    const underscores = Array(underscoreCount).fill('_').join(' ');

    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index !== parts.length - 1 && underscores}
      </React.Fragment>
    ));
  };
  return (
    <div className='flex flex-col mt-5'>

      <div>
    
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Sentence
            </label>
            <div className="mt-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                name="description-categorize"
                id="description-categorize"
                placeholder='Enter the sentence'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label>
            Select Text:
            <div onMouseUp={handleTextSelection} style={{ border: '1px solid #ccc', padding: '5px' }}>
              {renderQuestion()}
            </div>
          </label>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
            Points
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="points"
              id="pointer"
              className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">

        <div className="sm:col-span-3">
          <label>
            Question Preview:
            <div style={{ border: '1px solid #ccc', padding: '5px' }}>
              {renderQuestionWithBlanks()}
            </div>
          </label>
        </div>

      </div>
      <div>
        <div className="sm:col-span-3">
          <label>
            Options:
            {options.map((option, index) => (
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
            ))}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Cloze