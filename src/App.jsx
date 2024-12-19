import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesList from './pages/NotesList.jsx';
import CreateNote from './pages/CreateNote.jsx';
import EditNote from './pages/EditNote.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><NotesList /></>} /> {}
        <Route path="/create" element={<CreateNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
    </Router>
  );
}

export default App;