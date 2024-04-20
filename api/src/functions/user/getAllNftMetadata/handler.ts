/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { formatJSONResponse } from 'libs/apiGateway'
import { middyfy } from 'libs/lambda'
import getAllNFTResponse from 'mocks/nftMetadata.json'

const getAllNftMetadata = async () => {
  return formatJSONResponse(
    {
      nft_metadata: getAllNFTResponse,
    },
    200
  )
}

export const main = middyfy(getAllNftMetadata)
