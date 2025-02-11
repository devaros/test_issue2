// Функция для отправки запроса к API gptgod.online
async function getGPTGodResponse(inputText) {
  const apiKey = 'sk-OsMMq65tXdfOIlTUYtocSL7NCsmA7CerN77OkEv29dODg1EA'; // Замените на ваш API ключ
  //const url = 'https://gptgod.online/api/v1/generate';
  const url = 'https://gptgod.online';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: inputText,
      max_tokens: 150 // Максимальное количество токенов в ответе
    })
  });

  if (response.ok) {
    const data = await response.json();
    return data.choices[0].text.trim();
  } else {
    throw new Error('Ошибка при запросе к API');
  }
}

// Пример использования функции
async function main() {
  const inputText = 'Как дела?';
  try {
    const responseText = await getGPTGodResponse(inputText);
    console.log('Ответ от GPTGod:', responseText);
  } catch (error) {
    console.error(error);
  }
}

main();
