"use client"; // This is a client component
import { useState } from "react";
import { ITranslateRequest, ITranslateResponse } from "@sff/shared-types";
// URL of the translation API endpoint
const URL = "https://8mr2bg29k6.execute-api.ap-southeast-2.amazonaws.com/prod/";

// Function to handle the translation process by sending a POST request to the API
export const translateText = async ({
  inputLang,
  outputLang,
  inputText,
}: {
  inputLang: string;
  outputLang: string;
  inputText: string;
}) => {
  try {
    // Create a request object containing the source language, target language, and text to be translated
    const request: ITranslateRequest = {
      sourceLang: inputLang,
      targetLang: outputLang,
      sourceText: inputText,
    };
    // Send a POST request to the translation API endpoint with the request object as the body
    const result = await fetch(`${URL}`, {
      method: "POST",
      body: JSON.stringify(request),
    });
    // Parse the response from the API and return it as an ITranslateResponse object
    const rtnValue = (await result.json()) as ITranslateResponse;
    return rtnValue;
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export default function Home() {
  // State variables to hold input and output values
  const [inputText, setInputText] = useState<string>("");
  // State variables to hold selected languages
  const [inputLang, setInputLang] = useState<string>("");
  // State variables to hold selected languages
  const [outputLang, setOutputLang] = useState<string>("");
  // State variable to hold the translated output text
  const [outputText, setOutputText] = useState<ITranslateResponse | null>(null);

  return (
    <main className="flex min-h-screen m flex-col items-center justify-between p-24  bg-white ">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          // console.log({ inputText, inputLang, outputLang });
          const result = await translateText({
            inputLang,
            outputLang,
            inputText,
          });
          setOutputText(result);
        }}
      >
        <div className="flex flex-col gap-2 mt-2">
          <label className="font-semibold">Input Text</label>
          <textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label className="font-semibold">Input Language</label>
          <input
            id="inputLang"
            value={inputLang}
            onChange={(e) => setInputLang(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label className="font-semibold">Output Language</label>
          <input
            id="outputLang"
            value={outputLang}
            onChange={(e) => setOutputLang(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>

        <button
          className="btn bg-blue-500 p-3 mt-4 rounded-xl font-semibold text-white"
          type="submit"
        >
          Translate
        </button>
      </form>
      <pre style={{ whiteSpace: "pre-wrap" }} className="w-full">
        {JSON.stringify(outputText, null, 2)}
      </pre>
    </main>
  );
}
