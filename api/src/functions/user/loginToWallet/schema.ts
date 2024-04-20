export default {
  type: "object",
  properties: {
    mnemonic: { type: 'string' }, 
    passphrase: { type: 'string' }, 
  },
  required: ['mnemonic', 'passphrase']
} as const;
