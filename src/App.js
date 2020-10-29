import React, { useEffect, useState, useMemo } from 'react';
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

const thumbsContainer = {
    display: 'flex',
    marginTop: '1em',
    justifyContent: 'center'
};
  
const thumb = {
    borderRadius: 2,
};
  
const thumbInner = {
    display: 'flex',
    justifyContent: 'center'
};

const img = {
    display: 'block',
    height: '380px',
    padding: '6px',
    border: '1px solid #eaeaea',
};


function App() {
    const [files, setFiles] = useState([]);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/*', 
        maxFiles: 1,
        onDrop: acceptedFiles => {
            let arr = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }));
            setFiles(arr);
        }
    });

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

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                alt=""
                src={file.preview}
                style={img}
                />
            </div>
        </div>
    ));

    let getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    useEffect(() => {
        console.log('In use effect: ', files);
        // files.forEach(file => URL.revokeObjectURL(file.preview));

        let encodedImage = '';
        if (files.length){
            getBase64(files[0], (result) => {
                encodedImage = result;
                setLoading(true);
                fetch("http://127.0.0.1:3001/", {
                    method: 'POST',
                    mode: 'cors',
                    body: encodedImage,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        setLoading(false);
                        setCaption(res);
                        console.log(res)
                    });
            });
        }
        
    }, [files]);

    return (
        <div className="dropzone">
            {loading && (
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )}
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <div className="hint-container">
                    <div className="heading">Image Caption Generator</div>
                    <p>Caption an image using the power of Deep Learning</p>
                    <div>
                        {!caption && (
                            <div>
                                <div className="select-btn">Choose Image</div>
                                <p className="text-sm">or Drag 'n' drop an image here</p>
                            </div>
                        )}
                    </div>
                    <div>
                        {caption && (
                            <h4>Generated Caption</h4>
                        )}
                        {caption}
                    </div>
                    <div style={thumbsContainer}>
                        {thumbs}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
