import React,{useEffect} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = yup.object().shape({
    title: yup.string().required(),
    author: yup.string().required(),
    genre: yup.string().required(),
    year: yup.number().required().positive().integer(),
    status: yup.string().required(),
});

const BookModal = ({open, onClose, book})=> {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset} = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        reset(book || {});
    }, [book, reset]);

    const mutation = useMutation({
        mutationFn: (formData) => book ? API.put(`/books/${book.id}`, formData) : API.post('/books', formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:['books']});
            toast.success(`Book ${book ? 'updated' : 'added'} successfully`);
            onClose();
        },
        onError: () => toast.error('Operation failed')
    });

    const onSubmit = (data) => mutation.mutate(data);

    return(
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{book ? 'Edit Book' : 'Add Book'}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <TextField label="Title" {...register('title')} fullWidth margin="normal" />
                    <TextField label="Author" {...register('author')} fullWidth margin="normal" />
                    <TextField label="Genre" {...register('genre')} fullWidth margin="normal" />
                    <TextField label="Year" type="number" {...register('year')} fullWidth margin="normal" />
                    <TextField label="Status" {...register('status')} fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={mutation.isLoading}>
                        {mutation.isLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default BookModal;