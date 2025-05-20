import React from "react";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import API from '../services/api';
import { Table, TableHead, TableRow, TableCell, TableBody,IconButton, CircularProgress} from '@mui/material';
import { Edit,Delete} from '@mui/icons-material';
import toast from 'react-hot-toast';

const fetchBooks = async ()=> {
    const {data} = await API.get('/books');
    return data;
};

const BookTable = ({ onEdit}) => {
    const queryClient = useQueryClient();
    const {data: books = [], isLoading}= useQuery({
        queryKey: ['books'],
        queryFn: fetchBooks,
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => API.delete(`/books/${id}`),
        onSuccess: ()=> {
            toast.success('Book deleted');
            queryClient.invalidateQueries({ queryKey:['books']});
        },
        onError: () => toast.error('Delete failed')
    });

    if (isLoading) return <CircularProgress />;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {books.map((book) => (
                    <TableRow key={book.id}>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.genre}</TableCell>
                        <TableCell>{book.year}</TableCell>
                        <TableCell>{book.status}</TableCell>
                        <TableCell>
                            <IconButton onClick={() => onEdit(book)}><Edit /></IconButton>
                            <IconButton onClick={() => deleteMutation.mutate(book.id)}><Delete /></IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BookTable;