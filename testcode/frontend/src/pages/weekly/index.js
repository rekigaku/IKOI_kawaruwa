// pages/api-viewer.js
import { useState } from 'react';
import styles from './weekly.module.css'

export default function ApiViewer() {
  const [employeeId, setEmployeeId] = useState('');
  const [apiData, setApiData] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/api/weekly_filtered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employee_id: employeeId }),
    });
    const data = await response.json();
    setApiData(data);
  }

   // action_idの計算式
   const totalActions = apiData
   ? Object.values(apiData.counts).reduce((total, num) => total + num, 0)
   : 0;
   const progressPercentage = (totalActions / 50) * 100;


   return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Weekly Action Report</h2>
      <p CalssName="text-2xl font-bold text-gray-600 mb-10 mt-20">先週のアクション振り返り</p>
      <form onSubmit={handleSubmit} className="mb-8">
        {/* <label htmlFor="employeeId" className="block text-gray-900 text-lg font-medium mb-3">
          Employee ID:
        </label> */}
        <input
          id="employeeId"
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
          className="input input-bordered input-primary w-full max-w-xs mb-4 p-3 mr-5"
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
            <h3 className="text-xl font-semibold text-gray-900 mb-30">今週の強化アクション</h3>
            <p className="text-purple-800 mb-10 mt-10 txt-lg font-bold">{apiData.minActionName}</p>
          
          
            <div className="progress-bar-container relative bg-gray-200 rounded-full overflow-hidden h-6 mb-4">
              <div className="progress-bar bg-blue-600 rounded-l-full h-full flex items-center justify-center" style={{ width: `${progressPercentage}%` }}>
              <span className="text-white font-medium">{progressPercentage.toFixed(1)}%</span>
              </div>
            </div>
          
          
          </div>
        </div>
      )}
    </div>
  );
  
  



}
