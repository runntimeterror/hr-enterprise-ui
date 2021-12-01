import React, { Component, useState } from "react";
import { Storage } from "aws-amplify";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
Storage.configure({ level: 'private' });


export default function Fileupload() {
    const [selectedFiles, setSelectedFiles] = useState([{}])

    const [message, setMessage] = useState([""])
    const [isError, setIsError] = useState([false])
    const [open, setOpen] = useState(false);


    const setFiles = async (event) => {
        setSelectedFiles(event.target.files);
        const result = await Storage.put(event.target.files[0].name, event.target.files[0]);
        setOpen(true)
        console.log(result)
    }
     const handleClose = () =>{
        setOpen(false)
     }

    const upload = async () => {

    }
    return (
        <div className="mg20">
            <label htmlFor="btn-upload">
                <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={setFiles} />
                <Fab size="small" color="primary" aria-label="add" className="btn-choose"
                    variant="outlined"
                    component="span">
                    <CloudUploadIcon />
                </Fab>
            </label>
            <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                {message}
            </Typography>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    File was uploaded
                </Alert>
            </Snackbar>

        </div >
    );
}