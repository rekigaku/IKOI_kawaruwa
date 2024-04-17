export default async function handler(req, res) {
  console.log("Received body:", req.body);

  if (req.method === 'POST') {
    try {
      const flaskResponse = await fetch('http://localhost:5000/add_new_record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      // FlaskからのレスポンスがJSONを含んでいるかどうかを確認
      const contentType = flaskResponse.headers.get("content-type");
      if (!flaskResponse.ok || !contentType || !contentType.includes("application/json")) {
        throw new Error(flaskResponse.statusText);
      }

      const data = await flaskResponse.json();
      res.status(200).json(data);
      
    } catch (error) {
      // エラーをクライアントに通知
      res.status(500).json({ message: error.message });
    }
  } else {
    // 405 Method Not Allowedエラーを返す
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
