import { addUserToGroup } from 'functions/user/addToGroup'
import getAllNftMetadata from 'functions/user/getAllNftMetadata'
// import loginToWallet from "@functions/user/loginToWallet";
import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
  service: 'future-bright-backend',
  frameworkVersion: '3',
  plugins: [
    'serverless-auto-swagger',
    'serverless-esbuild',
    'serverless-offline',
  ],
  params: {
    prod: {
      production: true,
    },
    default: {
      production: false,
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'dev'}",
    httpApi: {
      cors: true,
      authorizers: {
        futureBrightJwtAuthorizer: {
          type: 'jwt',
          identitySource: '$request.header.Authorization',
          issuerUrl:
            "https://cognito-idp.us-east-1.amazonaws.com/${self:custom.cognitoPoolId.${opt:stage, 'dev'}}",
          audience: ["${self:custom.cognitoClientId.${opt:stage, 'dev'}}"],
        },
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      APP_ENV: '${self:custom.stage}',
      IS_PRODUCTION: '${param:production}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['cognito-idp:AdminAddUserToGroup'],
        Resource: '*',
      },
    ],
  },
  // import the function via path
  functions: {
    addUserToGroup,
    getAllNftMetadata,
    // loginToWallet
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      generateSwaggerOnDeploy: true,
      typefiles: ['./src/types/user.d.ts'],
      swaggerPath: 'docs',
      useStage: true,
    },
    cognitoPoolId: {
      dev: 'us-east-1_s2OFptMPq',
      qa: 'us-east-1_80EkS8Aaq',
      prod: 'us-east-1_6iaProvxF',
    },
    cognitoClientId: {
      dev: '43kdctln7s48mgh4aoa9du1rgm',
      qa: '6ql43j8p6p65ln2mtbspabna9l',
      prod: '3rujqeduan7d15gd7c7jg91jh2',
    },
  },
}

module.exports = serverlessConfiguration
