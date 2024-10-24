// src/hooks/useFormValidation.js
import { useState } from 'react';

const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Validate meeting time format (e.g., "MWF 12:00-13:20")
  const validateMeets = (meets) => {
    if (!meets) return ''; // Empty string is valid
    const timePattern = /^[MTWRF]+ \d{2}:\d{2}-\d{2}:\d{2}$/;
    if (!timePattern.test(meets)) {
      return 'Must contain days and start-end, e.g., MWF 12:00-13:20';
    }
    return '';
  };

  // Validate course title
  const validateTitle = (title) => {
    if (title.length < 2) {
      return 'Title must be at least 2 characters';
    }
    return '';
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues(prev => ({
      ...prev,
      [id]: value
    }));

    // Validate on change
    const newErrors = { ...errors };
    if (id === 'courseTitle') {
      const error = validateTitle(value);
      if (error) newErrors.title = error;
      else delete newErrors.title;
    }
    if (id === 'meetingTimes') {
      const error = validateMeets(value);
      if (error) newErrors.meets = error;
      else delete newErrors.meets;
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    const titleError = validateTitle(values.courseTitle);
    const meetsError = validateMeets(values.meetingTimes);

    if (titleError) newErrors.title = titleError;
    if (meetsError) newErrors.meets = meetsError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    validateForm
  };
};

export default useFormValidation;