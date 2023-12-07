import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { questionActions } from '../../../../store/slice/question';

const Comprehension = () => {
  const [passage, setPassage] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, title: '', question: '', options: [{ text: '', isAnswer: false }] },
  ]);
  const [image, setImage] = useState('')

  const dispatch = useDispatch()

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, title: '', question: '', options: [{ text: '', isAnswer: false }] }]);
  };

  const saveQuestion = () => {
    const formData = {
      type: 'comprehension',
      passage,
      image,
      questions,
    };
    dispatch(questionActions.handleAddQuestion(formData));

  }
  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({ text: '', isAnswer: false });
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].text = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.forEach(
      (option, idx) => (option.isAnswer = idx === optionIndex)
    );
    setQuestions(updatedQuestions);
  };


  const renderOptions = (questionIndex) => {
    return questions[questionIndex].options.map((option, optionIndex) => (
      <div key={optionIndex}>
        <input
          type="radio"
          name={`option_${questionIndex}`}
          checked={option.isAnswer}
          onChange={() => handleOptionChange(questionIndex, optionIndex)}
        />
        <input
          type="text"
          value={option.text}
          onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
          placeholder={`Option ${optionIndex + 1}`}
        />
      </div>
    ));
  };


  return (
    <div className="flex flex-col mt-5">
      <div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              Passage
            </label>
            <div className="mt-2">
              <textarea
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
                type="text"
                id="comprehension"
                placeholder="Type your passage"
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
                      onChange={(e) => setImage(e.target.value)}

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

      <div>
        <h3>Questions</h3>
        {questions.map((question, index) => (
          <div key={question.id}>
            <p className="font-semibold">Question {index + 1}</p>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  value={question.title}
                  onChange={(e) => updateQuestion(index, 'title', e.target.value)}
                  type="text"
                  placeholder="Enter title"
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
                  value={question.question}
                  onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                  type="text"
                  placeholder="Enter question"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label>
                Options:
                {renderOptions(index)}
                <button onClick={() => addOption(index)}>Add Option</button>
              </label>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addQuestion}>Add Question</button>
      <button onClick={saveQuestion}>Save Question</button>

    </div>
  );
};

export default Comprehension;
