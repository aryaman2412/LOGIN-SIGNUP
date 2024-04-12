import React, { useState } from 'react';
import home from './assets/home.jpg';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected.');
      alert("No file selected")
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('http://localhost:3000/home', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('File uploaded successfully.');
        alert("File uploaded successfully");
  
        // Redirect to another URL after successful upload
      
      } else {
        console.error('Error uploading file:', response.statusText);
        alert("error1");
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert("error2");
    }
  };
  

  return (
    <div style={{
      backgroundImage: `url(${home})`, // Assuming 'home' is the variable holding your background image URL
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
  }}>
      <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Soft shadow effect
      }}>
          <input type="file" onChange={handleFileChange} style={{ marginBottom: '10px' }} />
          <button onClick={handleUpload} style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>Upload</button>
      </div>
  </div>
  
  );
};

export default FileUpload;
