const AWS = require('aws-sdk');
const b64 = require('base64-js');
const encryptionSdk = require('@aws-crypto/client-node');

// https://repost.aws/knowledge-center/cognito-custom-email-sender-trigger
// aws kms create-key --description "KMS Key for CustomEmailSender" --region us-east-1

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${ JSON.stringify(event) }`);

    let plainTextCode;
// Configure the encryption SDK client with the KMS key from the environment variables.
    /*const {
        encrypt,
        decrypt
    } = encryptionSdk.buildClient(encryptionSdk.CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT);
    const generatorKeyId = process.env.KEY_ALIAS;
    const keyIds = [process.env.KEY_ARN];
    const keyring = new encryptionSdk.KmsKeyringNode({
        generatorKeyId,
        keyIds
    })

    // Decrypt the secret code using encryption SDK.
    if (event.request.code) {
        const {
            plaintext,
            messageHeader
        } = await decrypt(keyring, b64.toByteArray(event.request.code));
        plainTextCode = plaintext
    }*/
    // PlainTextCode now has the decrypted secret.

    if (event.triggerSource === 'CustomEmailSender_SignUp') {
        // Send email to end-user using custom or 3rd party provider.
        // Include temporary password in the email.
        console.log('CustomEmailSender_SignUp: ' + plainTextCode);
    } else if (event.triggerSource === 'CustomEmailSender_ResendCode') {
        console.log('CustomEmailSender_ResendCode: ' + plainTextCode);

    } else if (event.triggerSource === 'CustomEmailSender_ForgotPassword') {
        console.log('CustomEmailSender_ForgotPassword: ' + plainTextCode);

    } else if (event.triggerSource === 'CustomEmailSender_UpdateUserAttribute') {
        console.log('CustomEmailSender_UpdateUserAttribute: ' + plainTextCode);

    } else if (event.triggerSource === 'CustomEmailSender_VerifyUserAttribute') {
        console.log('CustomEmailSender_VerifyUserAttribute: ' + plainTextCode);

    } else if (event.triggerSource === 'CustomEmailSender_AdminCreateUser') {
        console.log('CustomEmailSender_AdminCreateUser: ' + plainTextCode);

    } else if (event.triggerSource === 'CustomEmailSender_AccountTakeOverNotification') {
        console.log('CustomEmailSender_AccountTakeOverNotification: ' + plainTextCode);
    }

    return;

    /*return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
        body: JSON.stringify('***** Hello from MFA SMS Custom Sender Lambda *****')
    };*/
};
