import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';

const ReactionForm = ({ thoughtId }) => {
    const [reactionBody, setBody] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [addReaction, { error }] = useMutation(ADD_REACTION);

    const handleChange = e => {
        if (e.target.value.length <= 280) {
            setBody(e.target.value);
            setCharCount(e.target.value.length);
        }
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        try {
            await addReaction({
                variables: { reactionBody, thoughtId }
            });
            setBody('');
            setCharCount(0);
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div>
            <p className={`m-0 ${charCount === 280 ? 'text-error' : ''}`}>
                Character Count: {charCount}/280
                {error && <span className='ml-2'>You done fucked up, Maurice</span>}
            </p>
            <form 
            className='flex-row justify-center justify-space-between-md align-stretch'
            onSubmit={handleFormSubmit}
            >
                <textarea
                placeholder='leave a reaction to this thought...'
                value={reactionBody}
                className='form-input col-12 col-md-9'
                onChange={handleChange}
                />
                <button className='btn col-12 col-md-3' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ReactionForm;