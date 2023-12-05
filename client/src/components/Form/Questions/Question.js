import React, { useState } from 'react'
import Categorize from './QuestionTypes/Categorize'
import Cloze from './QuestionTypes/Cloze'
import Comprehension from './QuestionTypes/Comprehension'
import { useSelector } from 'react-redux'

const Question = () => {
    // const questionType = useSelector((state) => state.question.questionType)
    const [questionType, setQuestionType] = useState(() => 'Categorize'); // Default type

    const handleChange = (event) => {
        setQuestionType(event.target.value);
    };

    const renderQuestionType = () => {
        switch (questionType) {
            case 'Categorize':
                return <Categorize />;
            case 'Cloze':
                return <Cloze />;
            case 'Comprehension':
                return <Comprehension />;
            default:
                return null;
        }
    };
    return (
        <div>
            <div>
                <select value={questionType} onChange={handleChange}>
                    <option value="Categorize">Categorize</option>
                    <option value="Cloze">Cloze</option>
                    <option value="Comprehension">Comprehension</option>
                </select>
                {renderQuestionType()}
            </div>

        </div>
    )
}

export default Question