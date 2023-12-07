import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { questionActions } from '../../../../store/slice/question';

const Option = ({ index, option, correctAnswer, handleOptionChange, handleOptionMove, updateOptionValue, deleteOption }) => {
  const [, ref] = useDrag({
    type: 'OPTION',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'OPTION',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        handleOptionMove(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drop(node)} style={{ marginBottom: '10px' }}>
      <input
        type="radio"
        name="correctAnswer"
        value={option.value}
        checked={correctAnswer === index}
        onChange={() => handleOptionChange(index)}
      />
      <input
        type="text"
        value={option.value}
        style={{ cursor: 'grabbing' }}
        onChange={(e) => updateOptionValue(index, e.target.value)}
        ref={ref}
      />
      <button onClick={() => deleteOption(index)}>Delete</button>
      <CloseIcon sx={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => deleteOption(index)} />

    </div>
  );
};
const Cloze = () => {
  const [question, setQuestion] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [options, setOptions] = useState([{ id: 1, value: '' }]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch()

  const handleSaveQuestion = () => {
    // Prepare the Cloze question data
    const clozeQuestion = {
      type: 'cloze',
      text: question,
      image,
      options: options.map((option) => option.value),
      answer: options[correctAnswer]?.value || '', // Use the correct answer based on the selected index
    };

    // Dispatch the action to add the Cloze question to the Redux store
    dispatch(questionActions.handleAddQuestion(clozeQuestion));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);

      setImage(file);
    }
  };
  const handleOptionChange = (index) => {
    setCorrectAnswer(index);
  };

  const handleOptionMove = (fromIndex, toIndex) => {
    const updatedOptions = [...options];
    const [movedOption] = updatedOptions.splice(fromIndex, 1);
    updatedOptions.splice(toIndex, 0, movedOption);
    setOptions(updatedOptions);
  };

  const addOption = () => {
    const newOption = { id: options.length + 1, value: '' };
    setOptions([...options, newOption]);
  };

  const updateOptionValue = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = { ...updatedOptions[index], value };
    setOptions(updatedOptions);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText !== '') {
      setSelectedText(selectedText);
    }
  };
  const deleteOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
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
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Upload Image
            </label>
            <div className="  mt-2 flex justify-center rounded-lg border block w-full border-dashed border-gray-900/25 px-6 py-10  ">
                        <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a image</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" 
                                    onChange={handleImageChange}

                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
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
        <DndProvider backend={HTML5Backend}>
          <div className="sm:col-span-3">
            <label>
              Options:
              {options.map((option, index) => (
                <Option
                  key={option.id}
                  index={index}
                  option={option}
                  correctAnswer={correctAnswer}
                  handleOptionChange={handleOptionChange}
                  handleOptionMove={handleOptionMove}
                  updateOptionValue={updateOptionValue}
                  deleteOption={deleteOption}
                />
              ))}
              <button onClick={addOption}>Add Option</button>
              <button onClick={handleSaveQuestion}>Save Question</button>

            </label>
          </div>
        </DndProvider>
      </div>
    </div>
  )
}

export default Cloze