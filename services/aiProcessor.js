const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const promptTemplate = (text) => `
You are an AI meeting minutes assistant. Given the raw notes below, extract the following:
1. A 2–3 sentence summary.
2. A list of key decisions.
3. A structured list of action items with: task, owner (optional), and deadline (optional).

Respond in JSON format:
{
  "summary": "...",
  "decisions": [],
  "actionItems": [
    {
      "task": "...",
      "owner": "...",
      "due": "..."
    }
  ]
}

Meeting Notes:
${text}
`;

async function processText(text) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: promptTemplate(text) }
    ],
    temperature: 0.3
  });

  const content = response.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch (err) {
    throw new Error('AI response could not be parsed as JSON');
  }
}

module.exports = { processText };
