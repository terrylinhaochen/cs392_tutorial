import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { useCourses } from './utilities/useCourses';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Banner title={"CS Course Schedule"} />
        <CourseList />
      </div>
    </QueryClientProvider>
  );
};

export default App;