// pages/api/getEmployeeRecords.js
export default async (req, res) => {
    if (req.method === 'POST') {
      try {
        // FlaskバックエンドエンドポイントのURL
        const flaskEndpoint = 'http://localhost:5000/get_daily_records';
        const { employee_id } = req.body;
        
        // Flaskバックエンドにリクエストを送信
        const response = await fetch(flaskEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ employee_id }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // レスポンスデータをJSONとして取得
        const data = await response.json();
        res.status(200).json(data);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    } else {
      // POSTリクエスト以外の場合は405 Method Not Allowedを返す
      res.setHeader('Allow', 'POST');
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  