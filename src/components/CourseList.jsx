import React from 'react';

const CourseList = ({ courses }) => (
  <div>
    <h2>Course List</h2>
    <table>
      <thead>
        <tr>
          <th>Term</th>
          <th>Number</th>
          <th>Title</th>
          <th>Meeting Times</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(courses).map(([id, course]) => (
          <tr key={id}>
            <td>{course.term}</td>
            <td>{course.number}</td>
            <td>{course.title}</td>
            <td>{course.meets}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CourseList;