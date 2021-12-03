import React, { useState } from 'react';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Storage } from "aws-amplify";
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
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import Fileupload from './Fileupload.js';
import Typography from '@mui/material/Typography';

Storage.configure({ level: 'private' });

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0",
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF",
        },
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1",
        },
    },
};

const useStyles = makeStyles(styles);

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
                downloadBlob(result.Body, data.row.key);
            }
            catch (err) {
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
            { field: 'size', headerName: 'Size(Kb)', width: 200 },
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

    const classes = useStyles();

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                    <Box sx={{ display: 'grid',  gridAutoColumns: '1fr',
    gap: 1}}>
                    <Box sx={{ gridRow: '1', gridColumn: 'span 2' }}>
                        <Typography className={classes.cardTitleWhite}>Documents</Typography>
                        </Box>
                        <Box sx={{ gridRow: '1', gridColumn: '9/9' }}>
                            <Fileupload></Fileupload>
                        </Box>
                        </Box>
                    </CardHeader>
                    <CardBody>
                        {rows != [] ?
                            <div>
                                <DataGrid autoHeight={true}
                                    rows={rows}
                                    columns={columns}
                                    pageSize={15}
                                    rowsPerPageOptions={[5]}
                                    disableSelectionOnClick
                                />
                            </div>
                            : null}
                    </CardBody>
                </Card>
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
                <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                        File was deleted successfully
                    </Alert>
                </Snackbar>
            </GridItem>
        </GridContainer>
    )
}

export default List