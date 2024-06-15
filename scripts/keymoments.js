import * as dotenv from "dotenv";
import OpenAI from "openai";
import { keymoments_instructions } from "../inputs.js";
import nlp from "compromise";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const gemini_key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(gemini_key);

export const extractKeyphraseGemini = async (input) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(input);
  const response = result.response;
  return response.text();
};

// const input =
//   "this year an Indian realy major made an announcement its latest luxury residential project was ready it was located in gurugram in India's national capital region the project opened for pre-sale and within 72 hours it was sold out we are talking about 1,113 luxury Flats valued at 7,200 CR rupees all laed up in just 3 days in India buying a house is a big deal a social right of passage an emotional experience and a guarantee of Financial Security there's also a lot of sentimental value attached but is this sentiment alone driving India's real estate market or are there other forces at play 2023 was a bumper year for Indian real estate will 2024 be bigger and better that's what we'll discuss tonight hello and welcome I'm py Sharma and this is between the lines [Music] Our Story begins with India's independence here was a nation that had been looted and plundered for centuries now free of occupiers trying to rebuild itself so the focus was on accessibility not luxury AKA public housing projects the government launched many of them all over the country then came the land reforms of the 50s and 6s land was redistributed the next big shift came in the 1980s that's when private housing entered the market and with liberalization in the 1990s it grew further large scale projects came up your it Parks shopping malls big budget housing cut to 2024 India's real estate market is among the fastest growing in the world and it's evident if you live in an Indian Metro City go out and look around the cultures may be different the language may be different the food habits may be different but there's one thing you'll find everywhere skyscrapers and cranes the droning noise of construction is deafening but it's also defining every major Indian city in 2023 India's real estate market was worth around $265 billion by 2030 it will be worth $1 trillion and by 2047 5.8 trillion that is the projection imagine that a 12-fold rise between 2023 and 2047 which means a lot will change currently real estate contributes to 7% of India's GDP it employs over 50 million people cement steel glass all of these industries depend on real estate by 2047 it could make up for more than 15% of the country's GDP it will be a mammoth sector and the trends are clear in 2022 homes worth 3.27 lakh CR rupees were sold the next year it went up to 4 and a half lakh crores that's a 38% rise in just one year so the demand is strong but where are these people investing India has 7 top residential markets Mumbai Delhi NCR bangaluru Hyderabad Chennai Kolkata and Pune essentially the country's biggest cities and last year these cities sold a lot of houses more than 476,000 units in one year a 31% increase since 2022 so what's driving this surge a lot of factors but the biggest one is India's economy it is shining in an otherwise gloomy Global picture growth has been stable the fundamentals are strong India's central bank has not hied interest rates all of this has driven up demand plus with the economy India's middle class is also Rising they're earning more they have more disposable income and they're investing in real estate the government supports this it wants real estate to Boom so it's offering incentives there are tax reductions subsidies for for buyers and schemes for affordable housing but it's not just affordable that Indian buyers are seeking a lot of them also want luxury premium properties now first things first what defines luxury real estate in India it's typically anything priced over 1.5 CR rupees if you're in Mumbai it's anything above 2 and a half crores that's luxury these properties have a few defining factors they're in Prime neighborhoods they have amenities there's topnotch infrastructure state-of-the-art fitness centers infinity pools rooftop lounges coner Services shopping centers it's this attention to detail that makes them appealing and the rich want them in the first 6 months of 2023 the sale of luxury homes jumped by 130% it was 3,000 units in 2022 6,900 units in 2023 that's a 130% rise then there's Ultra luxury homes that's real estate priced at over 40 CR rupees last year sales for that Rose by 200% almost 600 such homes were sold in India's top Seven Cities the numbers may sound too good to be true but it's not happening out of the blue there have been signs and one of them is India's Rising affluent demographic by 2027 the number of millionaires in the country set to increase by 69% then there are the ultra high net worth individuals people with a net worth of $30 million and more in the next 3 years India will have at least 9 18,000 ultra high net worth individuals they want affluent Lifestyles and the first thing they want is luxury real estate and it's not just housing that's picking up there's demand for other segments as well I'm talking about your office spaces co-working spaces malls all of them have seen an uptick in sales also industrial spaces your warehouses dark stores demand for those is also Rising growing e-commerce businesses are fueling it and investors are tracking this surge in including foreign investors they want to invest in India's real estate in the first half of 2023 more than 4 billion dollars flowed into India this was in the form of private credit and half of it went to real estate so foreign investors want to invest here and they're dumping China for it China's property Market is going through a slump debt is piling companies are shutting shop and the middle class is battered foreign investors or any investors for that matter do not like such volatility so they're turning to India here they get a growing economy a favorable demographic and a stable government it's almost an easy choice and it's working out for in India's favor so to sum it up more people are buying houses more houses are being built foreign money is pouring it and it all looks very good but no success story is without challenges and India's real estate story has its own share of challenges the first is the cost of land it is rising across the country India is now the 14th priciest residential real estate market globally which means affordable Solutions are few and far between it's not like everyone can afford a 1 and a half CR rupee house then there are bureaucratic processes you find an affordable plot of land you want to buy it but you'll have to jump through hoops the red tape can be daunting plus there are legal challenges 16% of all properties are embroiled in some or the other legal case and then there's the issue of loans most buyers cannot pay for the full price of their house so they take loans it's a tedious process especially when you don't know when you'll get possession of your property it can often take years Builders can go bust buildings can be left under construction and all the while you pay high interest rates and property taxes so there's a lot to discourage people a lot that needs to be fixed having said that the sentiment Still Remains positive real estate is booming in India and it's it's expected to continue to grow in the years to come it's also a reflection of India's journey of a country where dreams are built and realized one brick at a [Music] time that";
// const res = await extractKeyphraseGemini(input);

// const array = res.split("-");
// console.log(array.map((s) => s.trim()));

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const extractKeyphrase = async (text) => {
//   try {
//     console.log(text);
//     const completion = await openai.chat.completions.create({
//       messages: [
//         { role: "system", content: `${keymoments_instructions} ${text}` },
//       ],
//       model: "text-embedding-3-large",
//     });
//     console.log(completion);
//   } catch (error) {
//     console.log("Error:", error.message);
//   }
// };

// // Function to extract key phrases using nlp
// const extractKeyPhrases = (text, keywords) => {
//   const doc = nlp(text);
//   const sentences = doc.sentences().out("array");
//   return sentences.filter((sentence) => {
//     return keywords.some((keyword) => sentence.toLowerCase().includes(keyword));
//   });
// };

//extractKeyphrase("hello");
