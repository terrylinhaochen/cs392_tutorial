import React, { useState } from 'react';
import TermSelector from './TermSelector';  
import CourseList from './CourseList';

const TermPage = () => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');

  return (
    <div className="container mt-5">
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      <CourseList selectedTerm={selectedTerm} />
    </div>
  );
};

export default TermPage;