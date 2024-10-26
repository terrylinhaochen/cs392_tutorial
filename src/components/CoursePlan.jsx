import React from 'react';

const CoursePlan = ({ selectedCourses, courses }) => {
  if (selectedCourses.length === 0) {
    return (
      <div>
        <h2>No courses selected</h2>
        <p>Click on course cards to select courses for your plan.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Selected Courses</h2>
      {selectedCourses.map(id => {
        const course = courses[id];
        return (
          <div key={id}>
            <h3>CS {course.number}: {course.title}</h3>
            <p>Meeting times: {course.meets}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CoursePlan; 