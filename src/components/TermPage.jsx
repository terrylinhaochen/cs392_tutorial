import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

const TermPage = () => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');

  return (
    <div>
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      <CourseList selectedTerm={selectedTerm} />
    </div>
  );
};

export default TermPage;