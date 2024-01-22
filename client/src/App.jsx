import React, { useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3000/upload', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div>
      <div className='flex justify-center'>
        <div className='p-10'>
          <h1 className='text-3xl text-indigo-600'>File Upload App</h1>
          <div className='bg-indigo-600 w-5 h-1 rounded-full'></div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div class="flex items-center justify-center w-8/12">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX 10 Mb)</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" onChange={handleFileChange}/>
                </label>
            </div> 
      </div>
      <div className='flex justify-center p-5'>
      <button onClick={handleUpload} className='bg-indigo-600 text-white px-5 py-1 rounded-full shadow-md'>Upload</button>
      </div>
    </div>
  );
}

export default App;