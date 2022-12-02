const getKey = () => {
    return new Promise((resolve, request) => {
      chrome.storage.local.get(["openai-key"], (result) => {
        if (result["openai-key"]) {
          const decodedKey = atob(result["openai-key"]);
          resolve(decodedKey);
        }
      });
    });
  };

const generate = async (prompt) => {
  const key = await getKey();
  const url = "https://api.openai.com/v1/completions";

  const completionResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 350,
      temperature: 0.7,
    }),
  });

  const completion = await completionResponse.json();
  if (completion.choices.length > 0) {
    return completion.choices.pop();
  }
  return null;
};

const generateCompletionAction = async (info) => {
  try {
    const { selectionText } = info;
    const basePromptPrefix = `
      Improve this bio with humour and give me 5 exemples of bio:\n
      `;

    // Add this to call GPT-3
    const baseCompletion = await generate(
      `${basePromptPrefix}${selectionText}`
    );

    // Let's see what we get!
    console.log(baseCompletion.text);
  } catch (error) {
    console.log(error);
  }
};

chrome.contextMenus.create({
  id: "context-run",
  title: "Generate bio",
  contexts: ["selection"],
});
chrome.contextMenus.onClicked.addListener(generateCompletionAction);
