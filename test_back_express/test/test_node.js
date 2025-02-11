// замените 'YOUR_API_KEY' на ваш реальный API ключ
const apiKey = 'YOUR_API_KEY';

// функция отправки запроса к Cloudflare AI
async function fetchCloudflareAI(prompt) {
  //const url = 'https://api.cloudflare.com/v1/ai/llama/v1/completions';
  const url = 'https://api.cloudflare.com/client/v4/accounts/your_account_id/ai/llama/v1/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  const data = {
    model: 'llama',
    prompt: prompt,
    max_tokens: 2048,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.completion;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// пример использования функции
const prompt = 'Привет, расскажи мне о погоде';
fetchCloudflareAI(prompt).then((response) => console.log(response));

