import React from 'react';
import { useCourses } from '../utilities/useCourses';

const CourseCard = ({ course }) => (
  <div className="card h-100">
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{course.term} CS {course.number}</h5>
      <p className="card-text flex-grow-1">{course.title}</p>
      <p className="card-text mt-auto"><small className="text-muted">{course.meets}</small></p>
    </div>
  </div>
);

const CourseList = () => {
  const { data, isLoading, error } = useCourses();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {Object.entries(data.courses).map(([id, course]) => (
          <div key={id} className="col mb-4">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;