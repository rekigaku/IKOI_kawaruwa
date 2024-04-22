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
          let data = await response.json();
  
          // 下記のactionIDだけを対象とする
          const actionIds = ['act_1', 'act_2', 'act_3', 'act_4', 'act_5', 'act_11', 'act_12', 'act_13', 'act_14', 'act_15'];
          data = data.filter(item => actionIds.includes(item.action_id));
  
          // Count occurrences
          const counts = data.reduce((acc, { action_id }) => {
            acc[action_id] = (acc[action_id] || 0) + 1;
            return acc;
          }, {});
  
          // 最大値/最小値の計算及び　合計数の計算
          let maxCountFeedback = '';
          let minCountActionName = '';
          let minCountFeedback = '';
          let maxCount = 0;
          let minCount = Infinity;
  
          actionIds.forEach(action_id => {
            const count = counts[action_id] || 0;
            if (count > maxCount) {
              maxCount = count;
              maxCountFeedback = data.find(item => item.action_id === action_id).feedback;
            }
            if ((count > 0 && count < minCount) || (minCount === Infinity && count > 0)) {
              minCount = count;
              const item = data.find(item => item.action_id === action_id);
              minCountActionName = item.action_name;
              minCountFeedback = item.feedback;
            }
          });
  
          // Prepare the response data
          const responseData = {
            maxFeedback: maxCountFeedback,
            minActionName: minCountActionName,
            minFeedback: minCountFeedback,
            counts
          };
  
          res.status(200).json(responseData);
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
  