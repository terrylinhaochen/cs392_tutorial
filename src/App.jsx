import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import CourseEditForm from './components/CourseEditForm'; // Import the CourseEditForm
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Banner title={"CS Course Schedule"} />
          <Routes>
            <Route path="/" element={<Navigate to="/courses" />} /> {/* Redirect from root to /courses */}
            <Route path="/courses" element={<TermPage />} /> {/* Route for the course list */}
            <Route path="/edit-course/:id" element={<CourseEditForm />} /> {/* Route for editing a course */}
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;