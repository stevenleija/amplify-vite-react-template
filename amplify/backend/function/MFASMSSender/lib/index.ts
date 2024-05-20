import { Context, APIGatewayProxyResult, Handler } from 'aws-lambda';
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

export const handler: Handler = async (event, context:Context): Promise<APIGatewayProxyResult> => {
    console.log(`EVENT: ${ JSON.stringify(event) }`);
    console.log(`CONTEXT: ${ JSON.stringify(context) }`);

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

        const { triggerSource } = event;
        console.log(`triggerSource => ${ triggerSource }`);

        if (event.triggerSource === 'CustomMessage_Authentication') {
            const { codeParameter } = event.request;
            const {
                region,
                userName
            } = event;
            const { clientId } = event.callerContext;
            const redirectUrl = `${ process.env.REDIRECTURL }/?username=${ userName }`;
            const resourcePrefix = process.env.RESOURCENAME.split('CustomMessage')[0];

            const hyphenRegions = [
                'us-east-1',
                'us-west-1',
                'us-west-2',
                'ap-southeast-1',
                'ap-southeast-2',
                'ap-northeast-1',
                'eu-west-1',
                'sa-east-1'
            ];

            const separator = hyphenRegions.includes(region) ? '-' : '.';

            console.log(`userName: ${ userName }`);
            console.log(`redirectUrl: ${ redirectUrl }`);
            console.log(`region: ${ region }`);
            console.log(`clientId: ${ clientId }`);

            const payload = Buffer.from(
                JSON.stringify({
                    userName,
                    redirectUrl,
                    region,
                    clientId
                })
            ).toString('base64');

            const bucketUrl = `http://${ resourcePrefix }verificationbucket-${ process.env.ENV }.s3-website${ separator }${ region }.amazonaws.com`;
            const url = `${ bucketUrl }/?data=${ payload }&code=${ codeParameter }`;
            const message = `${ process.env.EMAILMESSAGE }. \n ${ url }`;
            event.response.smsMessage = message;
            event.response.emailSubject = process.env.EMAILSUBJECT;
            event.response.emailMessage = message;

            console.log(`event.response,  ${ JSON.stringify(event.response) }`);
        }
        else if (triggerSource === 'CustomMessage_SignUp') {
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

        return event;

        /* return {
             statusCode: 200,
             //  Uncomment below to enable CORS requests
             //  headers: {
             //      "Access-Control-Allow-Origin": "*",
             //      "Access-Control-Allow-Headers": "*"
             //  },
             body: JSON.stringify('***** Hello from MFA SMS Custom Sender Lambda *****')
         };*/
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
