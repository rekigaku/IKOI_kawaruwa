// pages/api/employee-actions.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // 以下は仮のデータ取得処理のコードとして置き換えてください
      const { employee_id } = req.body;
      // データベースからemployee_idに対応するデータを取得する
      const actions = [
        // この部分にデータベースから取得したデータを配列として置き換えます。
      ];
  
      // 応答をフィルタリングして必要なデータのみを返す
      const filteredActions = actions.map(action => ({
        category_name: action.category_name,
        action_name: action.action_name,
      }));
  
      res.status(200).json(filteredActions);
    } else {
      // POST以外のメソッドには405 Method Not Allowedを返す
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  