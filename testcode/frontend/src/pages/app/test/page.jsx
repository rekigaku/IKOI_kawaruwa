import React, { useState } from 'react';

const actionLabels = {
  'act_1': 'あいさつした',
  'act_2': '笑顔で接した',
  'act_3': '遮らず相手の話をきいた',
  'act_4': '目をみて話した',
  'act_5': '状況や進捗状況の声掛けをした',
  'act_6': 'あいさつしてくれた',
  'act_7': '笑顔で接してくれた',
  'act_8': 'あいづちを打ってくれた',
  'act_9': '目をみて話してくれた',
  'act_10': '質問をしてくれた',
  'act_11': 'あいさつした',
  'act_12': '笑顔で接した',
  'act_13': 'あいづちを打った',
  'act_14': '目をみて話した',
  'act_15': '質問をした',
  'act_16': '挨拶をしてくれた',
  'act_17': '笑顔で接してくれた',
  'act_18': '遮らずに自分の話をきいてくれた',
  'act_19': '目をみて話してくれた',
  'act_20': '状況や進捗確認の声掛けをしてくれた',
};

const getActionLabel = (actionId) => {
  // マッピングからラベルを取得、もし未定義ならactionIdをそのまま返す
  return actionLabels[actionId] || actionId;
};

const ActionButton = ({ actionId, onClick }) => (
  <button
    className="bg-teal-400 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
    type="button"
    onClick={() => onClick(actionId)}
  >
    {getActionLabel(actionId)}
  </button>
);



export default function ActionPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [selectedActions, setSelectedActions] = useState([]);

  const handleActionClick = (actionId) => {
    setSelectedActions([...selectedActions, actionId]);
  };

  const handleSubmit = async () => {
    const recordDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    try {
      const response = await fetch('/api/add_new_record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: employeeId,
          record_date: recordDate,
          action_ids: selectedActions,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Data submitted successfully', data);
        setSelectedActions([]);
        // setEmployeeId(''); // Uncomment this line if you also want to reset employeeId
      } else {
        console.error('Submission failed', data);
      }
    } catch (error) {
      console.error('Error submitting data', error);
    }
  };

  const isEmployeeLeader = ['emp_1', 'emp_2', 'emp_3', 'emp_4', 'emp_6'].includes(employeeId);
  const isEmployeeFive = employeeId === 'emp_5';
  const actionIdsForLeaders = ['act_11', 'act_12', 'act_13', 'act_14', 'act_15'];
  const actionIdsFromSubordinates = ['act_16', 'act_17', 'act_18', 'act_19', 'act_20'];
  const actionIdsForEmployeeFive = ['act_1', 'act_2', 'act_3', 'act_4', 'act_5'];
  const actionIdsFromEmployeeFive = ['act_6', 'act_7', 'act_8', 'act_9', 'act_10'];

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-lg p-5">
      <div className="form-control">
        <input
          className="input input-bordered w-full"
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter employee ID"
        />
      </div>
  
      <div className="divider">入力コードは消す予定</div>
  
      {isEmployeeFive ? (
        <div className="space-y-4">
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">部下へのアクション</h2>
            <div className="grid grid-cols-2 gap-2">
              {actionIdsForEmployeeFive.map((actionId) => (
                <ActionButton key={actionId} actionId={actionId} onClick={handleActionClick} className="btn btn-outline btn-accent btn-block" />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">部下からのアクション</h2>
            <div className="grid grid-cols-2 gap-2">
              {actionIdsFromEmployeeFive.map((actionId) => (
                <ActionButton key={actionId} actionId={actionId} onClick={handleActionClick} className="btn btn-outline btn-accent btn-block" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">{isEmployeeLeader ? '上司へのアクション' : '部下へのアクション'}</h2>
            <div className="grid grid-cols-2 gap-2">
              {(isEmployeeLeader ? actionIdsForLeaders : actionIdsForEmployeeFive).map((actionId) => (
                <ActionButton key={actionId} actionId={actionId} onClick={handleActionClick} className="btn btn-outline btn-accent btn-block" />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">{isEmployeeLeader ? '上司からのアクション' : '部下からのアクション'}</h2>
            <div className="grid grid-cols-2 gap-2">
              {(isEmployeeLeader ? actionIdsFromSubordinates : actionIdsFromEmployeeFive).map((actionId) => (
                <ActionButton key={actionId} actionId={actionId} onClick={handleActionClick} className="btn btn-outline btn-accent btn-block" />
              ))}
            </div>
          </div>
        </div>
      )}
  
        <div className="flex justify-center items-center mt-8">
          <button
            className="btn btn-primary btn-block text-xl text-white"
            type="button"
            onClick={handleSubmit}
          >
            登録する
          </button> 
        </div>

    </div>
  );
  
 

  
}