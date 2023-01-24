import React, { useState, useEffect } from 'react';

const SingleColor = ({ color, index }) => {
  // copy color when clicked
  const [copy, setCopy] = useState(false);

  const { rgb, weight, type, hex } = color;

  const rgbJoin = rgb.join(','); // rgb is an array
  console.log(rgbJoin); // ex: 206, 191, 231
  console.log(index);

  const bgColor = { style: { backgroundColor: `rgb(${rgbJoin})` } };

  // to clear 'copied' after 3s
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopy(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [copy]);

  return (
    <article
      className={`color ${type === 'shade' && 'color-light'}`}
      {...bgColor}
      onClick={() => {
        setCopy(true);
        navigator.clipboard.writeText(`#${hex}`);
      }}
    >
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>#{hex}</p>
      {copy && <p className='alert'>Copied</p>}
    </article>
  );
};

export default SingleColor;
