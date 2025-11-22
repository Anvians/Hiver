import React, { useState } from 'react';

const OpenAICheck = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const checkAPIKey = async () => {
    const apiKey = 'sk-abcdef1234567890abcdef1234567890abcdef12'; // Replace with your API key
    const url = 'https://api.openai.com/v1/completions';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: 'Say hello',
          max_tokens: 5,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data);
      } else {
        setError(`Error: ${data.error.message}`);
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    }
  };

  return (
    <div>
      <button onClick={checkAPIKey}>Check API Key</button>

      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default OpenAICheck;
