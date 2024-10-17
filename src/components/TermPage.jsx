import React, { useState } from 'react';
import TermSelector from './TermSelector';  
import CourseList from './CourseList';

const TermPage = () => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prevSelected => 
      prevSelected.includes(courseId)
        ? prevSelected.filter(id => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  return (
    <div className="container mt-5">
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      <CourseList 
        selectedTerm={selectedTerm} 
        selectedCourses={selectedCourses}
        toggleCourseSelection={toggleCourseSelection}
      />
    </div>
  );
};

export default TermPage;