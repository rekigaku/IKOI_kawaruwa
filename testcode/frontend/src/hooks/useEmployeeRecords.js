// hooks/useEmployeeRecords.js
import { useState } from 'react';

export default function useEmployeeRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmployeeRecords = async (employeeId) => {
    setLoading(true);
    try {
      const response = await fetch('/api/daily_report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee_id: employeeId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecords(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { records, loading, error, fetchEmployeeRecords };
}
