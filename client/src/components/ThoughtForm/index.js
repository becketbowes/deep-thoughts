import React, { useState } from 'react';

const ThoughtForm = () => {
    const [thoughtText, setText] = useState('');
    const [charCount, setCharCount] = useState(0);

    const handleChange = e => {
        if (e.target.value.length <= 280) {
            setText(e.target.value);
            setCharCount(e.target.value.length);
        }
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        setText('');
        setCharCount(0);
    }

    return (
        <div>
            <p className={`m-0 ${charCount === 280 ? 'text-error' : ''}`}>
                Character Count: {charCount}/280
            </p>
            <form 
            className='flex-row justify-center justify-space-between-md align-stretch'
            onSubmit={handleFormSubmit}
            >
                <textarea 
                placeholder="Here's something..." 
                value={thoughtText}
                className='form-input col-12 col-md-9' 
                onChange={handleChange}
                />
                <button className='btn col-12 cold-md-3' type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default ThoughtForm;