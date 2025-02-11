async function getFreeGPTResponse(prompt) {
  const apiUrl = 'https://freegptsnav.aifree.site/api/generate'; // Гипотетический URL API.  Возможно, он совсем другой или API не существует.
  const apiKey = 'YOUR_API_KEY'; //  Замените на ваш API ключ, если таковой требуется.  Возможно, ключа и не требуется.

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey ? `Bearer ${apiKey}` : undefined // Добавляем авторизацию, если ключ есть
      },
      body: JSON.stringify({ prompt: prompt })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text; // Предполагаемое поле с ответом.  Может быть другим.
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Пример использования:
getFreeGPTResponse("Привет, как дела?").then(response => console.log(response));