import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Banner title={"CS Course Schedule"} />
        <TermPage />
      </div>
    </QueryClientProvider>
  );
};

export default App;