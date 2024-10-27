// src/components/DataMigration.jsx
import React, { useState } from 'react';
import { migrateCourseData } from '../utilities/firebase';

const DataMigration = () => {
  const [status, setStatus] = useState('');

  const handleMigration = async () => {
    try {
      setStatus('Starting migration...');
      
      // First fetch the data to verify we can get it
      const response = await fetch('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
      const data = await response.json();
      console.log('Fetched data:', data);
      
      setStatus('Data fetched, uploading to Firebase...');
      
      const success = await migrateCourseData();
      
      if (success) {
        setStatus('Migration successful! Check Firebase console.');
        console.log('Migration complete');
      } else {
        setStatus('Migration failed. Check console for errors.');
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
      console.error('Migration error:', error);
    }
  };

  return (
    <div className="container mt-3">
      <button onClick={handleMigration} className="btn btn-primary">
        Migrate Course Data
      </button>
      {status && <div className="mt-2">{status}</div>}
    </div>
  );
};

export default DataMigration;