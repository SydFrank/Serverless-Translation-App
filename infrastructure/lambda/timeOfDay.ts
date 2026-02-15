import * as clientTranslate from "@aws-sdk/client-translate"; // AWS SDK client for Amazon Translate
import * as lambda from "aws-lambda"; // AWS Lambda types
import { ITranslateRequest, ITranslateResponse } from "@sff/shared-types";

// Create an instance of the Translate client
const translateClient = new clientTranslate.TranslateClient({});

/**
 *  Lambda function to return the time of day
 * @returns {Object} An object containing the status code and the time of day
 */
export const index: lambda.APIGatewayProxyHandler = async function (
  event: lambda.APIGatewayProxyEvent,
) {
  try {
    // Check if the request body is present
    if (!event.body) {
      throw new Error("body is empty");
    }

    // Parse the request body (if needed)
    const body = JSON.parse(event.body) as ITranslateRequest;

    // Validate the request body to ensure that the required fields are present
    if (!body.sourceLang) {
      throw new Error("sourceLang is empty");
    }
    // Validate the request body to ensure that the required fields are present
    if (!body.targetLang) {
      throw new Error("targetLang is empty");
    }
    // Validate the request body to ensure that the required fields are present
    if (!body.sourceText) {
      throw new Error("sourceText is empty");
    }

    // Extract the source language, target language, and text from the request body (if needed)
    const { sourceLang, targetLang, sourceText } = body;

    // Get the current time of day
    const now = new Date(Date.now()).toString();
    console.log(`The time of day is: ${now}`);

    // Translate the time of day to the target language
    const translateCmd = new clientTranslate.TranslateTextCommand({
      SourceLanguageCode: sourceLang,
      TargetLanguageCode: targetLang,
      Text: sourceText,
    });

    // Send the translation command to the Translate client
    const result = await translateClient.send(translateCmd);
    console.log(`Translated text: ${result.TranslatedText}`);

    // Check if the translation result is empty
    if (!result.TranslatedText) {
      throw new Error("Translation is empty");
    }
    // Create a response object containing the translated time of day
    const rtnDate: ITranslateResponse = {
      timeStamp: now,
      targetText: result.TranslatedText,
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow CORS for all origins
        "Access-Control-Allow-Credentials": true, // Allow credentials (cookies, authorization headers, etc.)
        "Access-Control-Allow-Methods": "*", // Allow all HTTP methods (GET, POST, etc.)
        "Access-Control-Allow-Headers": "*", // Allow all headers
      },
      body: JSON.stringify(rtnDate), // Return the translated time of day in the response body
    };
  } catch (err: any) {
    console.log(err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow CORS for all origins
        "Access-Control-Allow-Credentials": true, // Allow credentials (cookies, authorization headers, etc.)
        "Access-Control-Allow-Methods": "*", // Allow all HTTP methods (GET, POST, etc.)
        "Access-Control-Allow-Headers": "*", // Allow all headers
      },
      body: JSON.stringify(err.toString()), // Return the error message in the response body
    };
  }
};
