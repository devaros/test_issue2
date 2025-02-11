async function getGPT4FreeResponse(prompt) {
  const apiUrl = 'https://api.gpt4free.net/v1/chat'; // URL может измениться!
  //  ВНИМАНИЕ:  gpt4free часто меяет свой API.  Этот URL может быть неактуален.

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: prompt
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || response.statusText}`);
    }

    const data = await response.json();
    return data.response; // Структура ответа может измениться!
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


// Пример использования:
getGPT4FreeResponse("Привет, как дела?").then(response => {
  if (response) {
    console.log("Ответ:", response);
  } else {
    console.log("Ошибка получения ответа.");
  }
});

