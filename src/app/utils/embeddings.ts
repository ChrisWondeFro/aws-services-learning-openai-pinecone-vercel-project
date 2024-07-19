import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export async function getEmbeddings(input: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-3-small",
      input: input.replace(/\n/g, ' ')
    });

    if (!response.ok) {
      console.error("OpenAI API response error:", response.status, response.statusText);
      throw new Error(`OpenAI API responded with status: ${response.status}`);
    }

    const result = await response.json();

    if (!result || !result.data || !result.data[0] || !result.data[0].embedding) {
      console.error("Invalid response structure:", result);
      throw new Error("Invalid response structure from OpenAI API");
    }

    return result.data[0].embedding as number[];

  } catch (e) {
    console.error("Error calling OpenAI embedding API: ", e);
    throw new Error(`Error calling OpenAI embedding API: ${e}`);
  }
}
