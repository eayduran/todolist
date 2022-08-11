import React from 'react';
import { useState } from 'react';
import './App.css';

const App: React.FC = () => {

  const [addWord, setAddword] = useState(['']);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-300">
      <div className=''>

        <h1 className="text-white text-3xl font-bold">
          ToDo App
        </h1>

        <div id='header' className='flex flex-row'>
          <form>
            <label>
              <input id='input' className='rounded-l-xl w-60 h-12 text-center' type="text" name="name" placeholder='Create a new todo...'/>
            </label>
            {/* <input className='bg-green-200 rounded-xl w-28 h-12' type="submit" value="Submit" /> */}
          </form>
            <div onClick={()=>{
              const inputVal = document.getElementById('input') as HTMLInputElement;
              if(inputVal !== null && inputVal.value !== ''){
                setAddword([inputVal?.value, ...addWord]);
                inputVal.value = '';
              }
            }} className='rounded-r-xl w-28 h-12 flex items-center justify-center bg-red-200'>
              Sumbit
            </div>
        </div>

        <ul className='mt-10'>
            {
              addWord.map((word,i) => <li key={i}>{word}</li>)  
            }
        </ul>
        <div className='flex mt-10'>
            <div className='mr-20'>
              total task:{addWord.length - 1}
            </div>
            <div onClick={()=>{
                setAddword(['']);
            }}>
              delete all
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
