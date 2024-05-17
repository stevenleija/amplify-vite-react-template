/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_MFADEMO_USERPOOLID
	API_MFADEMO_TODOTABLE_NAME
	API_MFADEMO_TODOTABLE_ARN
	API_MFADEMO_GRAPHQLAPIIDOUTPUT
	ENVVAR1
Amplify Params - DO NOT EDIT */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.log(`EVENT: ${ JSON.stringify(event) }`);
    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
        body: JSON.stringify('Hello from Lambda!')
    };
};
