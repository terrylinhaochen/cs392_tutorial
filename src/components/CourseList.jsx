// src/components/CourseList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { hasConflict } from '../utilities/timeConflictUtils';
import { useAuthState, useDbData } from '../utilities/firebase';  // Update imports

const CourseCard = ({ course, id, isSelected, onToggleSelection, isSelectable }) => {
  const [user] = useAuthState();
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-course/${id}`);
  };

  return (
    <div 
      className={`card h-100 ${isSelected ? 'bg-light border-primary' : ''} ${!isSelectable ? 'text-muted' : ''}`}
      onClick={() => onToggleSelection(id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{course.term} CS {course.number}</h5>
        <p className="card-text flex-grow-1">{course.title}</p>
        <p className="card-text mt-auto">
          <small className="text-muted">{course.meets}</small>
        </p>
        {!isSelectable && <span className="text-danger">✖</span>}
        {user && (
          <button
            className="btn btn-warning mt-2"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

const CourseList = ({ selectedTerm, selectedCourses, toggleCourseSelection }) => {
  const [data, error] = useDbData('/');  // Use Firebase data directly
  const isLoading = !data && !error;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.courses) return <div>No courses available</div>;

  const filteredCourses = Object.entries(data.courses)
    .filter(([, course]) => course.term === selectedTerm);

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      {filteredCourses.map(([id, course]) => {
        const isSelectable = !selectedCourses.some(selectedId => 
          id !== selectedId && hasConflict(course, data.courses[selectedId])
        );

        return (
          <div key={id} className="col mb-4">
            <CourseCard 
              course={course} 
              id={id}
              isSelected={selectedCourses.includes(id)}
              onToggleSelection={toggleCourseSelection}
              isSelectable={isSelectable}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;