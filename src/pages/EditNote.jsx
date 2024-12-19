import { useState, useEffect } from 'react'; 
import { useDispatch } from 'react-redux';
import { updateNote } from '../redux/notesSlice';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Container,
  Paper,
} from '@mui/material';

const EditNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/update/${id}`, { title, description });
      dispatch(updateNote(response.data));
      navigate('/');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Editar Tarea
      </Typography>
      <Paper
        elevation={3}
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2 }}
            required
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Actualizar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditNote;