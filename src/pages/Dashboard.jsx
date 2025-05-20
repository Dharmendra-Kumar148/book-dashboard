import React, {useState} from "react";
import BookTable from '../components/BookTable';
import BookModal from '../components/BookModal';
import {Button, Typography, Box} from '@mui/material';

const Dashboard = () => {
    const [open, setOpen]= useState(false);
    const [selectedBook,setSelectedBook]= useState(null);

    return(
        <Box className="p-4">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1" fontWeight="bold">Book Management</Typography>
                <Button
                    variant="contained"
                    onClick={() => {
                    setSelectedBook(null);
                    setOpen(true);         
                }}>Add Book</Button>
            </Box>
            <BookTable onEdit={(book)=>{
                setSelectedBook(book);
                setOpen(true);
            }} />
            <BookModal open={open} onClose={()=>{setOpen(false); setSelectedBook(null);}} book={selectedBook} />
        </Box>
    );
};

export default Dashboard;