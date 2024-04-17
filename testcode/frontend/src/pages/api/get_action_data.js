export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const flaskResponse = await fetch('http://127.0.0.1:5000/get_filtered_actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      if (!flaskResponse.ok) {
        throw new Error(`HTTP error! status: ${flaskResponse.status}`);
      }

      const data = await flaskResponse.json();
      res.status(200).json(data);
    } catch (error) {
      const errorMessage = `Error: ${error.message}`;
      const stackTrace = error.stack;
      console.error(errorMessage, stackTrace);
      res.status(flaskResponse?.status || 500).json({ error: errorMessage });
    }
  } else {
    // Respond with 405 Method Not Allowed if the request method is not POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
