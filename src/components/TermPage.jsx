import React, { useState } from 'react';
import TermSelector from './TermSelector';  
import CourseList from './CourseList';
import Modal from './Modal';
import CoursePlan from './CoursePlan';  
import { useCourses } from '../utilities/useCourses';


const TermPage = () => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useCourses();

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(prevSelected => 
      prevSelected.includes(courseId)
        ? prevSelected.filter(id => id !== courseId)
        : [...prevSelected, courseId]
    );
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