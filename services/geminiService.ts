import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';
import { GeneratedContent } from '../types';

const API_KEY = process.env.API_KEY;

export const generateBlogPost = async (topic: string, type: 'game' | 'event'): Promise<GeneratedContent> => {
  if (!API_KEY) {
    throw new Error("La chiave API (API_KEY) non è configurata. L'applicazione non può contattare i servizi di Google.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  let topicInstruction = '';
  let structureInstruction = '';

  if (type === 'game') {
    topicInstruction = `
      You are an expert video game blogger and SEO specialist. Your task is to write an engaging and comprehensive blog post about a given video game title. The output must be perfectly formatted HTML ready to be copied and pasted into a WordPress blog. You must follow all the rules below precisely.

      **Game Title:**
      "${topic}"
    `;
    structureInstruction = `
      **Article Structure (for both Italian and English versions):**
      1.  **<h2>Introduction</h2>**: An in-depth general introduction. Identify the game's genre (e.g., <b>RPG</b>, <b>shooter</b>, <b>open-world</b>). Give a general overview without being too synthetic. Mention the available platforms.
      2.  **<h3>What to Expect</h3>**: A list of key features, formatted using the '✦' character as per the list formatting rule.
      3.  **<h3>Gameplay Deep Dive</h3>**: A detailed section about the game mechanics. Focus on the PC version's experience.
      4.  **<h3>Curiosities</h3>**: A paragraph with interesting trivia about the game's development or lore.
      5.  **<h3>Available Editions</h3>**: If the game has different editions (e.g., Deluxe, Gold), list them here with links to their hypothetical Indiegala pages. If not, omit this section.
      6.  **<h3>YOU MIGHT LIKE</h3>**: Suggest 1-3 similar games that are likely available on Indiegala. Provide a brief reason and the Indiegala link for each.
      7.  **Sequel/Prequel Section**: If "${topic}" is a sequel, add a final <h3> section explaining why players should play the previous titles, with links to them on Indiegala.
      8.  **<h3>Trailer</h3>**: Provide a direct URL to an official game trailer on YouTube. Format it as just the URL string, without any other text.
    `;
  } else { // type === 'event'
    topicInstruction = `
      You are an expert video game blogger and SEO specialist. Your task is to write an engaging and comprehensive blog post about a given video game theme or event. You must conduct reliable online research to gather information. The output must be perfectly formatted HTML ready to be copied and pasted into a WordPress blog. You must follow all the rules below precisely.

      **Theme / Event:**
      "${topic}"
    `;
    structureInstruction = `
      **Article Structure (for both Italian and English versions):**
      1.  **<h2>Introduction</h2>**: An in-depth general introduction to the theme or event. Explain what it is and why it's relevant to gamers.
      2.  **<h3>Highlights / Key Points</h3>**: A list of the most important aspects, announcements, or games related to the theme/event. Use the '✦' character format.
      3.  **<h3>Detailed Analysis</h3>**: A deeper dive into the most significant parts of the topic. For an event, discuss major announcements. For a theme (e.g., "best soulslikes"), analyze what makes the genre popular and discuss key titles.
      4.  **<h3>What It Means for the Future</h3>**: A paragraph on the impact of this event or theme on the video game industry.
      5.  **<h3>Related Games to Check Out</h3>**: Suggest 1-3 relevant games available on Indiegala that fit the theme or were featured in the event. Provide a brief reason and the Indiegala link for each.
    `;
  }
  
  const prompt = `
    ${topicInstruction}

    **General Rules:**
    1.  **Research:** Use your knowledge and perform reliable research to find in-depth information.
    2.  **Tone:** Write in a light, entertaining, and "cool" style. The introduction should be accessible to readers who don't know the topic.
    3.  **Bilingual:** Write the full article first in Italian, then provide a full English translation. Both versions must follow all formatting and SEO rules.
    4.  **Indiegala Store:** All game recommendations MUST be linked to the Indiegala store. Format links like this: \`<a href='https://www.indiegala.com/store/product/[game-name]' target='_blank' rel='noopener noreferrer'>[Game Title]</a>\`. If you are unsure of the exact URL, use a plausible slug for \`[game-name]\`. Do not mention any other stores like Steam. State that games are available on "our site".
    5.  **SEO Keywords:** You must provide two distinct sets of keywords: one for the Italian article (in Italian) and one for the English article (in English).
        - **Formatting:** The output for each language MUST be a single string with keywords and keyphrases separated by a single space.
        - **Composition:** You MUST generate relevant multi-word keyphrases (e.g., "open world RPG", "strategia a turni") instead of only single, broken-up words. This is crucial for creating effective keywords.
        - **Length:** Aim for a total string length of around 190 characters for each language.

    **HTML Formatting Rules (VERY IMPORTANT):**
    -   **Paragraphs:** EVERY paragraph of text MUST be enclosed in \`<p>...\</p>\` tags. This ensures proper spacing and structure. Do not return plain text without tags.
    -   **Headings:** Use \`<h2>\` for main section titles and \`<h3>\` for subsection titles, exactly as specified in the "Article Structure" section below.
    -   **Keywords (CRITICAL SEO TASK):** Your primary and most important goal is to maximize the number of bolded keywords for SEO. For BOTH the Italian and English articles, you MUST identify every possible relevant keyword and wrap it in \`<b>...\</b>\` tags. Be extremely aggressive and generous with this; do not be conservative. The more bolded keywords, the better. This includes genres (e.g., <b>RPG</b>, <b>shooter</b>), mechanics (e.g., <b>open-world</b>, <b>crafting</b>), developer/publisher names, character names, event names, and any related concepts. Every single time a relevant keyword appears, it must be bolded. Failure to do this will result in an incorrect output.
    -   **Lists:** For any lists, use the special character '✦' at the beginning of each item. Each list item MUST be wrapped in its own \`<p>...\</p>\` tag. DO NOT use \`<ul>\` or \`<li>\` tags. Example: \`<p>✦ This is a list item.</p>\`

    ${structureInstruction}

    **SEO (Yoast) Writing Style Rules:**
    -   **Consecutive sentences:** Do not start more than two sentences in a row with the same word.
    -   **Sentence length:** The majority of sentences should be under 20 words.
    -   **Transition words:** Use transition words (e.g., however, therefore, in addition, so) in at least 30% of sentences.
    -   **Active voice:** Heavily prefer the active voice.
    -   **Paragraphs:** Keep paragraphs under 150 words.
    -   **Headings:** Use <h2> and <h3> tags as specified in the structure.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    italianArticle: { type: Type.STRING },
                    englishArticle: { type: Type.STRING },
                    seoTitles: { 
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    italianSeoKeywords: { type: Type.STRING },
                    englishSeoKeywords: { type: Type.STRING }
                }
            }
        }
    });
    
    // The response text is a JSON string, so we need to parse it.
    const jsonString = response.text;
    const parsed = JSON.parse(jsonString) as GeneratedContent;
    return parsed;

  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw new Error("Errore di comunicazione con l'API di Gemini. Controlla la console per i dettagli.");
  }
};