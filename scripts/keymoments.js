// const { load } = require("spacy-js");

// async function extractProjectDetails(text) {
//   // Load spaCy with English model
//   const nlp = await load("en");

//   // Process the text
//   const doc = nlp(text);

//   // Initialize variables to store extracted details
//   let location = "";
//   let numberOfFlats = 0;
//   let projectValue = 0;

//   // Extract entities
//   doc.entities.forEach((entity) => {
//     if (entity.label === "LOC") {
//       location = entity.text;
//     } else if (entity.label === "CARDINAL") {
//       // Extract number of flats
//       numberOfFlats = parseInt(entity.text.replace(/,/g, ""), 10);
//     } else if (entity.label === "MONEY") {
//       // Extract project value
//       projectValue = parseFloat(entity.text.replace(/,/g, ""));
//     }
//   });

//   // Return an object with extracted details
//   return {
//     location: location,
//     numberOfFlats: numberOfFlats,
//     projectValue: projectValue,
//   };
// }

// // Example usage:
// const textSnippet = `this year an Indian realy major made an announcement its latest luxury residential project was ready it was located in gurugram in India's national capital region the project opened for pre-sale and within 72 hours it was sold out we are talking about 1,113 luxury Flats valued at 7,200 CR rupees`;
// extractProjectDetails(textSnippet)
//   .then((projectDetails) => {
//     console.log(projectDetails);
//   })
//   .catch((err) => {
//     console.error("Error extracting project details:", err);
//   });

import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

app.use(cors());
dotenv.config();

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const extractKeyphrase = async (text) => {
  try {
    console.log(text);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    console.log(response);
    const answer = response.data.choices[0].text;
    const array = answer.split("\n");
    const result = array.filter((value) => value).map((value) => value.trim());
    res.json({ result: result });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(error.response.status).json({ error: error.message });
  }
};
