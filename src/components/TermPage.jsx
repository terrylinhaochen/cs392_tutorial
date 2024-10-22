import React, { useState } from 'react';
import TermSelector from './TermSelector';  
import CourseList from './CourseList';
import Modal from './Modal';
import CoursePlan from './CoursePlan';  
import { useCourses } from '../utilities/useCourses';
import { hasConflict } from '../utilities/timeConflictUtils'; // Import the conflict utility

const TermPage = () => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useCourses();

  const toggleCourseSelection = (courseId) => {
    const courseToToggle = data.courses[courseId];

    // Check if the course is currently selected
    if (selectedCourses.includes(courseId)) {
      // Allow deselection regardless of conflicts
      setSelectedCourses(prevSelected => 
        prevSelected.filter(id => id !== courseId)
      );
    } else {
      // Only allow selection if there are no conflicts
      const hasConflictWithSelected = selectedCourses.some(selectedId => 
        hasConflict(courseToToggle, data.courses[selectedId])
      );

      if (!hasConflictWithSelected) {
        setSelectedCourses(prevSelected => 
          [...prevSelected, courseId]
        );
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
        <button className="btn btn-primary" onClick={openModal}>Course Plan</button>
      </div>
      <CourseList 
        selectedTerm={selectedTerm} 
        selectedCourses={selectedCourses}
        toggleCourseSelection={toggleCourseSelection}
      />
      <Modal open={isModalOpen} close={closeModal}>
        <CoursePlan selectedCourses={selectedCourses} courses={data?.courses || {}} />
      </Modal>
    </div>
  );
};

export default TermPage;