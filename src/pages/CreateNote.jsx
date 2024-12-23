import { useState } from 'react'; 
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/notesSlice';
import api from '../config/axiosConfig'; // Importamos la configuración de Axios
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/save', { title, description }); // Usamos la instancia de Axios

        if (response.data?.note) {
            dispatch(addNote(response.data.note)); 
        } else {
            console.error('No se recibió la nota en la respuesta');
        }

        navigate('/'); 
    } catch (error) {
        console.error('Error creando la nota:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography variant="h4" align="center" color="primary">
            Crear Tarea
          </Typography>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateNote;
