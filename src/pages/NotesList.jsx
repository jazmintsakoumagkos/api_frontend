import { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { setNotes, deleteNote } from '../redux/notesSlice';
import api from '../config/axiosConfig'; // Importamos la configuración de Axios
import { Link } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  Button,
  Container,
  Paper,
  Box,
} from '@mui/material';

const NotesList = () => {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get('/notes'); // Usamos la configuración de Axios
        dispatch(setNotes(response.data.notes)); 
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes(); 
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/delete/${id}`); // Usamos la configuración de Axios
      dispatch(deleteNote(id)); 
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Lista de Tareas
      </Typography>
      <Button
        component={Link}
        to="/create"
        variant="contained"
        color="secondary"
        sx={{ mb: 3 }}
      >
        Crear Nueva Tarea
      </Button>
      <List>
        {notes.length === 0 ? (
          <Typography>No hay tareas disponibles.</Typography>
        ) : (
          notes.map((note) => (
            <Paper
              key={note._id}
              elevation={2}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <Typography variant="h6" color="text.primary">
                  {note.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {note.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                  <Button
                    component={Link}
                    to={`/edit/${note._id}`}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(note._id)}
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    Eliminar
                  </Button>
                </Box>
              </ListItem>
            </Paper>
          ))
        )}
      </List>
    </Container>
  );
};

export default NotesList;
