import React from 'react';

const TermButton = ({ term, selectedTerm, setSelectedTerm }) => (
  <button
    className={`btn btn-${term === selectedTerm ? 'primary' : 'secondary'} me-2`}
    onClick={() => setSelectedTerm(term)}
  >
    {term}
  </button>
);

const TermSelector = ({ selectedTerm, setSelectedTerm }) => (
  <div className="btn-group mb-4" role="group" aria-label="Term selector">
    <TermButton term="Fall" selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
    <TermButton term="Winter" selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
    <TermButton term="Spring" selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
  </div>
);

export default TermSelector;  