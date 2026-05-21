import React from 'react';

const ProgressBar = ({ value, max = 100, className = '' }) => {
  const percent = (value / max) * 100;
  return (
    <div className={`progress-bar ${className}`}>
      <div className="progress-fill" style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default ProgressBar;