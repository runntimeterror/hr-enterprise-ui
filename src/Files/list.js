import React, { useState } from 'react';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Storage } from "aws-amplify";
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

Storage.configure({ level: 'private' });

function List() {
    const [rows, setFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [dataToBeDeleted, setDataToBeDeleted] = useState({});

    React.useEffect(() => {
        getFiles()
    }, []);

    const deleteFile = React.useCallback(
        (data) => async () => {
            setDataToBeDeleted(data)
            setOpen(true);
        },
        [],
    );

    const downloadFile = React.useCallback(
        (data) => async () => {
            try {
                console.log("data.row.key,", data.row.key,)
            //    var result= await Storage.get(data.row.key, { level: 'private', download: true })

               const result = await Storage.get(data.row.key, { download: true });
                downloadBlob(result.Body, 'filename');
            }
            catch(err) {
                console.error(err)
                return
            }
           //    downloadBlob(result.body, data.row.key)
        }, []);
    
        function downloadBlob(blob, filename) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename || 'download';
            const clickHandler = () => {
              setTimeout(() => {
                URL.revokeObjectURL(url);
                a.removeEventListener('click', clickHandler);
              }, 150);
            };
            a.addEventListener('click', clickHandler, false);
            a.click();
            return a;
          }

    const columns = React.useMemo(
        () => [
            { field: 'key', headerName: 'File Name', width: 200 },
            { field: 'size', headerName: 'Size', width: 200 },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteFile(params)} />,
                    <GridActionsCellItem
                        icon={<DownloadIcon />}
                        label="Download"
                        onClick={downloadFile(params)} />
                ],
            },
        ], [deleteFile, downloadFile])

    const getFiles = async () => {
        var files = await Storage.list('')
        console.info("files ==>", files)
        var i = 1
        var updFiles = []
        updFiles = files.map((f) => {
            f.id = i++
            return f
        })
        setFiles(updFiles)
        console.log("updFiles", updFiles)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteClick = async () => {
        try {
            var done = await Storage.remove(dataToBeDeleted.row.key, { level: 'private' })


        }
        catch (err) {
            return err
            console.error(err)
        }
        setOpen(false);
        setOpenAlert(true)
        window.location.reload();

    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Your Files
            </Typography>
            {rows != [] ?
                <div style={{ height: 300, width: '50%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div> : null}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete File</DialogTitle>
                <DialogContent>
                    {/*  */}
                    <Box sx={{ width: 500, height: 100, }}>
                        Are you sure you want to delete this file
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={handleDeleteClick}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openAlert} autoHideDuration={1024000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    File was deleted successfully
                </Alert>
            </Snackbar>
        </>
    )
}

export default List