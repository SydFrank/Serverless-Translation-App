import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs"; // Node.js Lambda function construct

export class InfrastuctureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a Node.js Lambda function using the NodejsFunction construct
    new lambdaNodeJS.NodejsFunction(this, "timeOfDay", {
      entry: "./lambda/timeOfDay.js",
      handler: "index",
      runtime: lambda.Runtime.NODEJS_22_X,
    });
  }
}
