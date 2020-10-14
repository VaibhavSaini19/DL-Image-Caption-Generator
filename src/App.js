import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    height: '100%',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };


function App() {
    const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*', maxFiles: 1});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="dropzone">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div className="hint-container">
            <div className="heading">Image Caption Generator</div>
            <p>Caption an image using the power of Deep Learning</p>
            <br/>
            <div className="select-btn">Choose Image</div>
            <p className="text-sm">or Drag 'n' drop an image here</p>
        </div>
      </div>
    </div>
  );
}

export default App;
