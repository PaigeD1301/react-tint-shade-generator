import React, { useState } from 'react';
import SingleColor from './SingleColor';

import Values from 'values.js';

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  // set a default list of tints and shades when browser loads
  const [list, setList] = useState(new Values('#845EC2').all(10));
  // const [list, setList] = useState([]);

  // try catch MUST be inside handleSubmit, otherwise app will crash (too many re-renders)
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      console.log(colors); // array of base, tints, shades
      setList(colors);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <section className='container'>
        <h1>Tint & Shade Generator</h1>
        <form onSubmit={handleSubmit}>
          <h3>Enter a color</h3>
          <input
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder='#845EC2'
            // if input value is invalid, add 'error' class
            className={`${error ? 'error' : null}`}
          />
        </form>
        <button className='btn' type='submit'>
          Generate
        </button>
      </section>

      <section className='colors'>
        {list.map((color, index) => {
          console.log(color);

          return <SingleColor index={index} color={color} />;
        })}
      </section>
    </>
  );
}

export default App;
