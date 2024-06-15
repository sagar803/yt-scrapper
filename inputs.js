export const keywords = [
  "Delhi NCR real estate",
  "property listing Delhi",
  "house for sale in Delhi NCR",
];

export const keymoments_instructions =
  "Extract key phrases from the following text, focusing on important property details such as area, age, number of rooms, and type of property (apartment/studio/commercial space, etc.). Return them strictly in the form of a list.";

//output format

// {
//   "title": "String",  // Title of the YouTube video
//   "link": "String",    // URL of the YouTube video
//   "uploadDate": "String",  //For-eg "9 months ago"
//   "videoId": "String",  // Unique identifier for the video on YouTube
//   "comments": [
//     "String",  // Text of the first comment
//     "String",  // Text of the second comment
//     ...         // ... and so on for all comments
//   ],
//   "transcripts": {
//     "string": "String", // Full transcript text of the video
//     "timestamped": [
//       {
//         "text": "String",     // Text spoken in a segment
//         "start": "Number",   // Starting time (seconds) of the segment
//         "duration": "Number" // Duration (seconds) of the segment
//       },
//     ]
//   },
//   "keyphrase": [
//     "String",  // First keyphrase
//     "String",  // Second keyphrase
//   ]
// }
