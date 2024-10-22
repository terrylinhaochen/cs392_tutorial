import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CourseEditForm = ({ courses }) => {
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();

  // Find the course based on the ID
  const course = courses.find(course => course.id === id); // Ensure courses is defined

  // Handle case where course is not found
  if (!course) {
    return <div>Course not found</div>; // Display a message if the course is not found
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    // For now, do nothing on submit
  };

  const handleCancel = () => {
    navigate('/courses'); // Navigate back to the course list
  };

  return (
    <div className="container mt-5">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseTitle" className="form-label">Course Title</label>
          <input
            type="text"
            className="form-control"
            id="courseTitle"
            defaultValue={course.title} // Populate with existing course title
          />
        </div>
        <div className="mb-3">
          <label htmlFor="meetingTimes" className="form-label">Meeting Times</label>
          <input
            type="text"
            className="form-control"
            id="meetingTimes"
            defaultValue={course.meets} // Populate with existing meeting times
          />
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CourseEditForm;