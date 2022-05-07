import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

const ThoughtForm = () => {
    const [thoughtText, setText] = useState('');
    const [charCount, setCharCount] = useState(0);

    const [addThought, { error }] = useMutation(ADD_THOUGHT, {
        update(cache, { data: { addThought } }) {
          try {
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
            });
          } catch (e) {
            console.warn("Aw, Baby's first thought")
          }
      
          const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
          cache.writeQuery({
            query: QUERY_THOUGHTS,
            data: { thoughts: [addThought, ...thoughts] },
          });
        }
      });

    const handleChange = e => {
        if (e.target.value.length <= 280) {
            setText(e.target.value);
            setCharCount(e.target.value.length);
        }
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        try {
            await addThought({
                variables: { thoughtText }
            });
            setText('');
            setCharCount(0);
        } catch(err) {
            console.error(err)
        }
    };

    return (
        <div>
            <p className={`m-0 ${charCount === 280 ? 'text-error' : ''}`}>
                Character Count: {charCount}/280
                {error && <span className='ml-2'>Shit's fucked, yo</span>}
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