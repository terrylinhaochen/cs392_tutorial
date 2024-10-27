// src/components/DataMigration.jsx
import React from 'react';
import { migrateCourseData } from '../utilities/firebase';

const DataMigration = () => {
  const handleMigration = async () => {
    const success = await migrateCourseData();
    if (success) {
      alert('Data migration successful!');
    } else {
      alert('Data migration failed. Check console for details.');
    }
  };

  return (
    <button onClick={handleMigration} className="btn btn-primary">
      Migrate Course Data
    </button>
  );
};

export default DataMigration;