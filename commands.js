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
      typeof args[2] !== 'string') return encoders.EncodeError('Expected both arguments to be of "string" type')

  store.set(args[1], args[2])

  return encoders.EncodeSimpleString('OK')
}

function GETBIT (args, store) {
  if (args.length !== 3) return encoders.EncodeError('Wrong number of arguments')

  if (typeof args[1] !== 'string' ||
      typeof args[2] !== 'string' ||
      isNaN(parseInt(args[2]))) return encoders.EncodeError('Expected both arguments to be "string" and "number" types')

  if (!store.has(args[1])) return encoders.EncodeInteger(0)

  const val = store.get(args[1])
  if (typeof val !== 'string') return encoders.EncodeError('Value is expected to be of "string" type')

  const bitPos = parseInt(args[2])
  const buf = Buffer.from(val)
  const bytePos = parseInt(bitPos / 8)
  if (buf.byteLength > bytePos + 1) return encoders.EncodeInteger(0)

  const bitVal = (parseInt(buf[bytePos]) >> (8 - (bitPos % 8))) & 1
  return encoders.EncodeInteger(bitVal)
}

function SETBIT (args, store) {
  if (args.length !== 3) return encoders.EncodeError('Wrong number of arguments')

  if (typeof args[1] !== 'string' ||
      typeof args[2] !== 'string' ||
      isNaN(parseInt(args[2]))) return encoders.EncodeError('Expected both arguments to be "string" and "number" types')

  let buf
  const bitPos = parseInt(args[2])
  if (!store.has(args[1])) buf = Buffer.alloc(parseInt(bitPos / 8) + (bitPos % 8 === 0 ? 0 : 8))
  else buf = Buffer.from(store.get(args[1]))

  const bytePos = parseInt(bitPos / 8)
  // if (buf.byteLength > bytePos + 1) return encoders.EncodeInteger(0)

  const bitVal = (parseInt(buf[bytePos]) >> (8 - (bitPos % 8))) & 1
  // write new bit value
}

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
