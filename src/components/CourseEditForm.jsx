import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses, useDbUpdate, useAuthState } from '../utilities/firebase';  // Add useAuthState here
import { useFormData } from '../utilities/useFormData';

// Keep component definitions outside
const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input 
      className={`form-control ${state.errors?.[name] ? 'is-invalid' : ''}`}
      id={name} 
      name={name}
      value={state.values[name] || ''} 
      onChange={change} 
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled, onCancel}) => (
  <div className="d-flex">
    <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
      Cancel
    </button>
    <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>
      Submit
    </button>
    <span className="p-2">{message}</span>
  </div>
);

const validateCourseData = (key, val) => {
  switch (key) {
    case 'courseTitle':
      return val.length >= 2 ? '' : 'Title must be at least 2 characters';
    case 'meetingTimes':
      if (!val) return '';
      const timePattern = /^[MTWRF]+ \d{2}:\d{2}-\d{2}:\d{2}$/;
      return timePattern.test(val) ? '' : 'Must contain days and start-end, e.g., MWF 12:00-13:20';
    default: return '';
  }
};

const CourseEditForm = () => {
  // Add auth state check at the top with other hooks
  const [user] = useAuthState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCourses();
  const [update, result] = useDbUpdate(`/courses/${id}`);
  const [state, change] = useFormData(validateCourseData, {
    courseTitle: '',
    meetingTimes: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Use useEffect to update form data after loading
  useEffect(() => {
    if (data?.courses?.[id]) {
      const course = data.courses[id];
      change({ target: { id: 'courseTitle', value: course.title }});
      change({ target: { id: 'meetingTimes', value: course.meets }});
    }
  }, [data, id]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!state.errors && data?.courses?.[id]) {
      const updatedCourse = {
        ...data.courses[id],
        title: state.values.courseTitle,
        meets: state.values.meetingTimes
      };
      update(updatedCourse);
    }
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  // Show loading/error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.courses?.[id]) return <div>Course not found</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit} noValidate>
        <InputField 
          name="courseTitle" 
          text="Course Title" 
          state={state} 
          change={change} 
        />
        <InputField 
          name="meetingTimes" 
          text="Meeting Times" 
          state={state} 
          change={change} 
        />
        <ButtonBar 
          message={result?.message} 
          disabled={!!state.errors}
          onCancel={handleCancel}
        />
      </form>
    </div>
  );
};

export default CourseEditForm;