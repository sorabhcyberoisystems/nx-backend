import type { AWS } from '@serverless/typescript';

const CognitoResources: AWS['resources']['Resources'] = {
  UserPool: {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
      UserPoolName: 'serverless-auth-pool',
      Schema: {
        name: 'email',
        Required: true,
        Mutable: true
      },
      Policies: {
        PasswordPolicy: {
          MinimumLength: 6
        }
      },
      AutoVerifiedAttributes: ["email"]
    }
  },
  UserClient: {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
      ClientName: 'user-pool-ui',
      GenerateSecret: false,
      UserPoolId: { Ref: 'UserPool' },
      AccessTokenValidity: 5,
      IdTokenValidity: 5,
      ExplicitAuthFlows: ['ADMIN_NO_SRP_AUTH']
    }
  }
}

export default CognitoResources