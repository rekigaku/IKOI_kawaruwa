export default async function handler(req, res) {
    // POSTリクエストのみを許可
    if (req.method === 'POST') {
      const { employee_id } = req.body;
      
      try {
        const response = await fetch('http://localhost:5000/get_weekly_records', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employee_id,
          }),
        });
        
        // Flaskからのレスポンスが成功していることを確認
        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          // Flaskからのエラーレスポンスを処理
          const errorData = await response.text();
          res.status(response.status).json({ message: errorData });
        }
        
      } catch (error) {
        // ネットワークエラーなどの問題を処理
        res.status(500).json({ message: error.message });
      }
  
    } else {
      // POST以外のメソッドは許可しない
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }
  