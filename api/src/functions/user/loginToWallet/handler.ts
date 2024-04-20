/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import * as crypto from 'crypto'
import { sign } from 'jsonwebtoken'
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from 'libs/apiGateway'
import schema from './schema'

export type LoginToWalletResponse = {
  isSignedIn: boolean
  avatarUrl: string
  publicKey: string
  token: string
}

const loginToWallet: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: any
) => {
  try {
    const { mnemonic, passphrase } = JSON.parse(event.body)
    const jwtToken = event.headers.authorization

    // Extract username from JWT payload.
    const encodedTokenPayload = jwtToken.split('.')[1]
    const decodedTokenPayload = Buffer.from(
      encodedTokenPayload,
      'base64'
    ).toString('utf8')
    const tokenPayload = JSON.parse(decodedTokenPayload)
    const username = tokenPayload['cognito:username']

    console.log('mnemonic, passphrase:: ', event.body)

    // Encrypt payload data using HMAC SHA256 algo.
    const encryptedMnemonic = hamcEncrypt(username, mnemonic)
    const encryptedPassphrase = hamcEncrypt(username, passphrase)

    // Construct JWT Token.
    const payload = {
      mnemonic: encryptedMnemonic,
      passphrase: encryptedPassphrase,
    }
    const signInOptions = {
      expiresIn: '5m',
    }
    const token = sign(payload, username, signInOptions)

    // Return the response with Token.
    const response: Record<string, unknown> = mockedResponse(token)
    return formatJSONResponse(response, 200)
  } catch (e) {
    console.error(e)
    return formatJSONResponse({ message: 'error occured', e }, 500)
  }
}

export const main = loginToWallet

function hamcEncrypt(key: any, data: any) {
  return crypto.createHmac('sha256', key).update(data).digest('base64')
}

function mockedResponse(token: string): LoginToWalletResponse {
  return {
    isSignedIn: true,
    avatarUrl:
      'https://avatars.dicebear.com/api/identicon/9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08.svg',
    publicKey:
      '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    token,
  }
}
