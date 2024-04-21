import React, { useState, useEffect } from 'react';
import useEmployeeRecords from '../../hooks/useEmployeeRecords';

const EmployeeRecordsComponent = () => {
  const [employeeId, setEmployeeId] = useState('');
  const { records, loading, error, fetchEmployeeRecords } = useEmployeeRecords();
  const [maxFeedbacks, setMaxFeedbacks] = useState([]); 

  useEffect(() => {
    if (records.length > 0) {
      console.log('Records updated:', records);
      const count = {};
      const feedbacks = {};
      // 対象のアクションIDを含むレコードのみを処理
      records.forEach((record) => {
        if (['act_1', 'act_2', 'act_3', 'act_4', 'act_5', 'act_11', 'act_12', 'act_13', 'act_14', 'act_15'].includes(record.action_id)) {
          count[record.action_id] = (count[record.action_id] || 0) + 1;
          feedbacks[record.action_id] = record.feedback;
        }
      });

      // 最大値を見つける
      let maxCount = 0;
      Object.values(count).forEach(actionCount => {
        if (actionCount > maxCount) {
          maxCount = actionCount;
        }
      });

      // 最大値に等しいカウントを持つすべてのaction_idを見つける
      const maxActionIds = Object.keys(count).filter(actionId => count[actionId] === maxCount);

      // 複数のfeedbackを格納する配列
      const maxFeedbacks = maxActionIds.map(actionId => feedbacks[actionId]);

      console.log('Max action IDs:', maxActionIds);
      console.log('Max feedbacks:', maxFeedbacks);

      // 複数のfeedbackをstateにセット
      setMaxFeedbacks(maxFeedbacks);
    }
  }, [records]);

    // employee_id の入力がないと、登録されず　エラーがでる仕組
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Fetching records for employee:', employeeId);
    await fetchEmployeeRecords(employeeId);
  };

  
  
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-20">今日のアクション振り返り</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary mt-2 ml-5">Submit</button>
      </form>
      {loading && <p className="text-primary">Loading...</p>}
      {error && <p className="text-error">Error: {error}</p>}
      {maxFeedbacks.length > 0 ? (
        <div className="space-y-2">
          {maxFeedbacks.map((feedback, index) => (
            <p key={index} className="feedback">{feedback}</p>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No feedback available.</p>
      )}
    </div>
  );
}

export default EmployeeRecordsComponent;
