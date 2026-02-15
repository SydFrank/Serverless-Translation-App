// Define the request type for the translation input
export type ITranslateRequest = {
  sourceLang: string;
  targetLang: string;
  sourceText: string;
};

// Define the response type for the translation result
export type ITranslateResponse = {
  timeStamp: string;
  targetText: string;
};
