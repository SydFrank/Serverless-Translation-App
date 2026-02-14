import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs"; // Node.js Lambda function construct
import * as apigateway from "aws-cdk-lib/aws-apigateway"; // API Gateway construct
import * as iam from "aws-cdk-lib/aws-iam"; // IAM construct for permissions

export class InfrastuctureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define an IAM policy statement that allows the Lambda function to call the TranslateText API
    const translateAccessPolicy = new iam.PolicyStatement({
      actions: ["translate:TranslateText"],
      resources: ["*"],
    });

    // Create a Node.js Lambda function using the NodejsFunction construct
    const lambdaFunction = new lambdaNodeJS.NodejsFunction(this, "timeOfDay", {
      entry: "./lambda/timeOfDay.js",
      handler: "index",
      runtime: lambda.Runtime.NODEJS_22_X,
      initialPolicy: [translateAccessPolicy], // Attach the IAM policy to the Lambda function
    });

    // Create an API Gateway REST API and integrate it with the Lambda function
    const restApi = new apigateway.RestApi(this, "timeOfDayRestApi");
    // Add a GET method to the root of the API and integrate it with the Lambda function
    restApi.root.addMethod(
      "GET",
      new apigateway.LambdaIntegration(lambdaFunction),
    );
  }
}
