import * as clientTranslate from "@aws-sdk/client-translate"; // AWS SDK client for Amazon Translate
import * as lambda from "aws-lambda"; // AWS Lambda types

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
    const body = JSON.parse(event.body);
    // Extract the source language, target language, and text from the request body (if needed)
    const { sourceLang, targetLang, text } = body;

    // Get the current time of day
    const now = new Date(Date.now()).toString();
    console.log(`The time of day is: ${now}`);

    // Translate the time of day to the target language
    const translateCmd = new clientTranslate.TranslateTextCommand({
      SourceLanguageCode: sourceLang,
      TargetLanguageCode: targetLang,
      Text: text,
    });

    // Send the translation command to the Translate client
    const result = await translateClient.send(translateCmd);
    console.log(`Translated text: ${result.TranslatedText}`);

    // Create a response object containing the translated time of day
    const rtnDate = {
      timeStamp: now,
      text: result.TranslatedText,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(rtnDate), // Return the translated time of day in the response body
    };
  } catch (err: any) {
    console.log(err);
    return {
      statusCode: 500,
      body: err.toString(), // Return the error message in the response body
    };
  }
};
