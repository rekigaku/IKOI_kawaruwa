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
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // エラーメッセージ用の状態を追加

  const handleActionClick = (actionId) => {
    setSelectedActions([...selectedActions, actionId]);
  };

  const handleSubmit = async () => {
    if (!employeeId.trim()) {
      setError('Employee ID is required.'); // employee_idが空の場合、エラーメッセージを設定
      setTimeout(() => setError(''), 5000); // 5秒後にエラーメッセージを消去
      return; // ここで送信処理を中断
    }

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
        setMessage('データ送信 成功しました');
        setSelectedActions([]);
        setTimeout(() => setMessage(''), 5000); // 5秒後にメッセージを消去
      } else {
        setMessage('送信失敗: ' + data.message);
        setTimeout(() => setMessage(''), 5000); // エラーの場合
      }
    } catch (error) {
      setMessage('送信エラー: ' + error.toString());
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const isEmployeeLeader = ['emp_1', 'emp_2', 'emp_3', 'emp_4', 'emp_6'].includes(employeeId);
  const isEmployeeFive = employeeId === 'emp_5';
  const actionIdsForLeaders = ['act_11', 'act_12', 'act_13', 'act_14', 'act_15'];
  const actionIdsFromSubordinates = ['act_16', 'act_17', 'act_18', 'act_19', 'act_20'];
  const actionIdsForEmployeeFive = ['act_1', 'act_2', 'act_3', 'act_4', 'act_5'];
  const actionIdsFromEmployeeFive = ['act_6', 'act_7', 'act_8', 'act_9', 'act_10'];


  // ActionSection コンポーネントを新しく作成し、背景色のプロパティを追加
const ActionSection = ({ title, actionIds, handleClick, bgColor = 'bg-white' }) => (
  <div className={`${bgColor} p-4 rounded-lg shadow-sm`}>
    <div className="flex flex-col items-start">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">{title}</h2>
      <div className="grid grid-cols-2 gap-2">
        {actionIds.map((actionId) => (
          // ここに 'w-full' を追加してボタンの幅を統一します
          <ActionButton key={actionId} actionId={actionId} onClick={handleClick} className="btn btn-outline btn-accent btn-block w-full" />
        ))}
      </div>
    </div>
  </div>
);

return (
  <div className="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-lg p-5">
    <div className="form-control mb-4">
      <input
        className="input input-bordered w-full"
        type="text"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        placeholder="Enter employee ID"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>

    {isEmployeeFive ? (
      <>
        <ActionSection title="部下へのアクション" actionIds={actionIdsForEmployeeFive} handleClick={handleActionClick} bgColor="bg-gray-50" />
        <div className="my-6"></div> {/* ここでセクションの間隔を設けています */}
        <ActionSection title="部下からのアクション" actionIds={actionIdsFromEmployeeFive} handleClick={handleActionClick} bgColor="bg-gray-50" />
      </>
    ) : (
      <>
        <ActionSection title={isEmployeeLeader ? '上司へのアクション' : '部下へのアクション'} actionIds={isEmployeeLeader ? actionIdsForLeaders : actionIdsForEmployeeFive} handleClick={handleActionClick} bgColor="bg-teal-50" />
        <div className="my-6"></div> {/* ここでセクションの間隔を設けています */}
        <ActionSection title={isEmployeeLeader ? '上司からのアクション' : '部下からのアクション'} actionIds={isEmployeeLeader ? actionIdsFromSubordinates : actionIdsFromEmployeeFive} handleClick={handleActionClick} bgColor="bg-teal-50" />
      </>
    )}

    <div className="flex justify-center items-center mt-8">
      <button
        className="btn btn-primary btn-active btn-block text-xl text-white"
        type="button"
        onClick={handleSubmit}
      >
        登録する
      </button>
    </div>

    {message && (
      <div className="text-center p-2 my-2 bg-blue-100 text-blue-800 rounded">
        {message}
      </div>
    )}

  </div>
);

}
