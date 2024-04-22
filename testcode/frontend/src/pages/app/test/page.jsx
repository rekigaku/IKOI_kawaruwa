import React from 'react';
import styles from './weekly.module.css'; // Import CSS module

const WeeklyReportPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">今週のレポート</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <label htmlFor="employeeId" className="block text-gray-900 text-lg font-medium mb-3">
          Employee ID:
        </label>
        <input
          id="employeeId"
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
          className="input input-bordered input-primary w-full max-w-xs mb-4 p-3"
        />
        <button type="submit" className="btn btn-primary px-5 py-3">Submit</button>
      </form>
      {apiData && (
        <div className="space-y-6">
          <div className="p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">先週のアクションレポート</h3>
            <p className="text-gray-900">{apiData.maxFeedback}</p>
          </div>
  
          <div className="p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">今週の強化アクション</h3>
            <p className="text-gray-900">{apiData.minActionName}</p>
            <div className="progress-bar-container bg-gray-300 rounded-full overflow-hidden h-6 mb-6">
              <div className="progress-bar bg-blue-500 h-full" style={{ width: `${progressPercentage}%` }}>
                {progressPercentage.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default WeeklyReportPage;
