import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import b64 from 'base64-js';
// import encryptionSdk from '@aws-crypto/client-node';

// https://repost.aws/knowledge-center/cognito-custom-email-sender-trigger
// aws kms create-key --description "KMS Key for CustomEmailSender" --region us-east-1
// Secret name: dev/mfa/keyalias
// "KEY_ALIAS": "68b78b8f-b3f8-46d1-9252-7d9475dfa28c",
// "KEY_ARN": "arn:aws:kms:us-east-1:184944340258:key/68b78b8f-b3f8-46d1-9252-7d9475dfa28c"
// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html
/*import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "dev/mfa/keyalias";

const client = new SecretsManagerClient({
    region: "us-east-1",
});

let response;

try {
    response = await client.send(
        new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
    );
} catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
}

const secret = response.SecretString;*/

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.log(`EVENT: ${ JSON.stringify(event) }`);

    try {
        let plainTextCode: string | Buffer;
        /*const {
            encrypt,
            decrypt
        } = encryptionSdk.buildClient(encryptionSdk.CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT);
        // Configure the encryption SDK client with the KMS key from the environment variables.

        const generatorKeyId = process.env.KEY_ALIAS;
        console.log(`generatorKeyId => ${ generatorKeyId }`);
        const keyIds: Array<string> = [process.env.KEY_ARN];
        console.log(`keyIds => ${ keyIds }`);

        // @ts-ignore
        const { code } = event.request;

        // Decrypt the secret code using encryption SDK.
        if (code) {
            const keyring = new encryptionSdk.KmsKeyringNode({
                generatorKeyId,
                keyIds
            })
            const {
                plaintext,
                messageHeader
            } = await decrypt(keyring, b64.toByteArray(code));
            plainTextCode = plaintext;
        }
        // PlainTextCode now has the decrypted secret.*/

        // @ts-expect-error need to find type
        const { triggerSource } = event;
        console.log(`triggerSource => ${ triggerSource }`);

        if (triggerSource === 'CustomMessage_SignUp') {
            console.log('CustomMessage_SignUp: ' + plainTextCode);
        } else if (triggerSource === 'CustomMessage_ResendCode') {
            console.log('CustomMessage_ResendCode: ' + plainTextCode);
        } else if (triggerSource === 'CustomMessage_ForgotPassword') {
            console.log('CustomMessage_ForgotPassword: ' + plainTextCode);
        } else if (triggerSource === 'CustomMessage_UpdateUserAttribute') {
            console.log('CustomMessage_UpdateUserAttribute: ' + plainTextCode);
        } else if (triggerSource === 'CustomMessage_VerifyUserAttribute') {
            console.log('CustomMessage_VerifyUserAttribute: ' + plainTextCode);
        } else if (triggerSource === 'CustomMessage_AdminCreateUser') {
            console.log('CustomMessage_AdminCreateUser: ' + plainTextCode);
        } else if (triggerSource === 'CustomMessage_AccountTakeOverNotification') {
            console.log('CustomMessage_AccountTakeOverNotification: ' + plainTextCode);
        }

        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            //  headers: {
            //      "Access-Control-Allow-Origin": "*",
            //      "Access-Control-Allow-Headers": "*"
            //  },
            body: JSON.stringify('***** Hello from MFA SMS Custom Sender Lambda *****')
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error Happened'
            })
        };
    }
};
