// CourseEditForm.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../utilities/useCourses'; // Ensure this is the correct import
import useFormValidation from '../hooks/useFormValidation';  

const CourseEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCourses(); // Use the same hook as TermPage

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error: {error.message}</div>;

  // Check if data is available
  if (!data || !data.courses) {
    return <div>No courses available</div>; // Handle case where courses is not available
  }

  // Find the course based on the ID
  const course = data.courses[id]; // Access course directly from the data object

  // Handle case where course is not found
  if (!course) {
    return <div>Course not found</div>;
  }

  const { values, errors, handleChange, validateForm } = useFormValidation({
    courseTitle: course.title,
    meetingTimes: course.meets
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Submit form if valid
      console.log('Form is valid, submitting...', values);
      // Add your submission logic here
    }
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  return (
    <div className="container mt-5">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseTitle" className="form-label">
            Course Title
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="courseTitle"
            value={values.courseTitle}
            onChange={handleChange}
          />
          {errors.title && (
            <div className="invalid-feedback">
              {errors.title}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="meetingTimes" className="form-label">
            Meeting Times
          </label>
          <input
            type="text"
            className={`form-control ${errors.meets ? 'is-invalid' : ''}`}
            id="meetingTimes"
            value={values.meetingTimes}
            onChange={handleChange}
          />
          {errors.meets && (
            <div className="invalid-feedback">
              {errors.meets}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CourseEditForm;
