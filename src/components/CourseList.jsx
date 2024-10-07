import React from 'react';

const CourseCard = ({ course }) => (
    <div className="card m-1 p-2" style={{width: '18rem'}}>
      <div className="card-body">
        <h5 className="card-title">{course.term} {course.number}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{course.title}</h6>
        <p className="card-text">{course.meets}</p>
      </div>
    </div>
  );
  
  const CourseList = ({ courses }) => (
    <div className="course-list">
      <div className="row">
        {Object.values(courses).map((course, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );  

export default CourseList;