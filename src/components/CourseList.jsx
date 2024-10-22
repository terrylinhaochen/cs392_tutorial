import React from 'react';
import { useCourses } from '../utilities/useCourses';
import { hasConflict } from '../utilities/timeConflictUtils'; // Import the hasConflict function

const CourseCard = ({ course, id, isSelected, onToggleSelection, isSelectable }) => (
  <div 
    className={`card h-100 ${isSelected ? 'bg-light border-primary' : ''} ${!isSelectable ? 'text-muted' : ''}`}
    onClick={() => onToggleSelection(id)} // Always allow onClick
    style={{ cursor: 'pointer' }} // Change cursor to pointer
  >
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{course.term} CS {course.number}</h5>
      <p className="card-text flex-grow-1">{course.title}</p>
      <p className="card-text mt-auto"><small className="text-muted">{course.meets}</small></p>
      {!isSelectable && <span className="text-danger">✖</span>} {/* Indicate unselectable */}
    </div>
  </div>
);

const CourseList = ({ selectedTerm, selectedCourses, toggleCourseSelection }) => {
  const { data, isLoading, error } = useCourses();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data || !data.courses) return <div>No courses available</div>;

  const filteredCourses = Object.entries(data.courses).filter(([, course]) => course.term === selectedTerm);

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      {filteredCourses.map(([id, course]) => {
        const isSelectable = !selectedCourses.some(selectedId => 
          hasConflict(course, data.courses[selectedId]) // Check for conflicts
        );

        return (
          <div key={id} className="col mb-4">
            <CourseCard 
              course={course} 
              id={id}
              isSelected={selectedCourses.includes(id)}
              onToggleSelection={toggleCourseSelection}
              isSelectable={isSelectable} // Pass the selectability
            />
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;