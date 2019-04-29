const encoders = require('./encoders')

function GET (args, store) {
  if (args.length !== 2) return encoders.EncodeError('Wrong number of arguments')

  if (typeof args[1] !== 'string') return encoders.EncodeError('Expected "string" type')

  if (!store.has(args[1])) return '$-1\r\n' // signal non-existence of a value

  const val = store.get(args[1])
  if (typeof val !== 'string') return encoders.EncodeError('Value is expected to be of "string" type')

  return encoders.EncodeSimpleString(val)
}

function SET (args, store) {
  if (args.length !== 3) return encoders.EncodeError('Wrong number of arguments')

  if (typeof args[1] !== 'string' ||
      typeof args[2] !== 'string') return encoders.EncodeError('Expected "string" type')

  store.set(args[1], args[2])

  return encoders.EncodeSimpleString('OK')
}

function GETBIT (args, store) {}

function SETBIT (args, store) {}

function SAVE (args, store) {}

function INFO () {
  return encoders.EncodeSimpleString('# Server\nredis_version: 0.0.1')
}

module.exports = {
  GET,
  SET,
  GETBIT,
  SETBIT,
  SAVE,
  INFO
}
