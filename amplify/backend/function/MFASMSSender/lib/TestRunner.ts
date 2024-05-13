/*
import { APIGatewayProxyResult, Callback } from 'aws-lambda';
// import chalk from 'chalk';
import event from './event.json';
import { GetApplicantDownloadURLs } from './index';

const bucketQA = 'universityportalqa0147d07faff94fe7a0702da2667b892941-qa';
const bucketStaging = 'universityportalqa0147d07faff94fe7a0702da2667b8142431-staging';
const bucketProd = 'universityportalqa0147d07faff94fe7a0702da2667b8154455-prod';
const bucket = process.env.S3BUCKET ?? bucketQA;
const region = process.env.AWS_REGION ?? 'OHIO';

(async () => {
    // console.debug(`${ chalk.green('process.env.S3BUCKET') } => ${ bucket }`);
    // console.debug(`${ chalk.green('process.env.AWS_REGION') } => ${ region }`);

    // @ts-ignore
    const applicants = event.applicants;
    // console.debug(applicants);

    const callback: Callback = (error?: Error | string | null, result?: any) => {
        console.error(error);
    }

    // @ts-ignore
    const results: APIGatewayProxyResult = await new GetApplicantDownloadURLs(bucket, applicants, callback).process().catch(e => {
        throw e;
    });
    // console.log(chalk.green('\nResults:'));
    console.log('Results:');
    console.log(results);
})();
*/
