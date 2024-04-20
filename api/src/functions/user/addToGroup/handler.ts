import { Callback, Context, PostConfirmationTriggerEvent } from 'aws-lambda'
import * as AWS from 'aws-sdk'

async function addToGroup(
  event: PostConfirmationTriggerEvent,
  _context: Context,
  callback: Callback
): Promise<void> {
  const { userPoolId, userName } = event
  console.log('Event:: ', event)
  console.log('Request Event:: ', event.request)

  const { groupName } = event.request.clientMetadata

  try {
    const userParam = {
      userPoolId,
      username: userName,
      groupName,
    }
    await addUserToGroup(userParam)

    return callback(null, event)
  } catch (error) {
    return callback(error, event)
  }
}

function addUserToGroup({
  userPoolId,
  username,
  groupName,
}: {
  userPoolId: string
  username: string
  groupName: string
}): Promise<{ $response: AWS.Response<Record<string, string>, AWS.AWSError> }> {
  const params = {
    GroupName: groupName,
    UserPoolId: userPoolId,
    Username: username,
  }
  console.log('User Param in addUserToGroup:: ', params)
  const cognitoIdp = new AWS.CognitoIdentityServiceProvider()
  return cognitoIdp.adminAddUserToGroup(params).promise()
}

export const main = addToGroup
