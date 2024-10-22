// CourseEditForm.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../utilities/useCourses'; // Import the custom hook

const CourseEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCourses(); // Use the same hook as TermPage

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Find the course based on the ID
  const course = data.courses[id]; // Access course directly from the data object

  // Handle case where course is not found
  if (!course) {
    return <div>Course not found</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // For now, do nothing on submit
  };

  const handleCancel = () => {
    navigate('/courses');
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
            defaultValue={course.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="meetingTimes" className="form-label">Meeting Times</label>
          <input
            type="text"
            className="form-control"
            id="meetingTimes"
            defaultValue={course.meets}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CourseEditForm;