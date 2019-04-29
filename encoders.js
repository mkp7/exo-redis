function EncodeBulkString (str) {
  // if (typeof str !== 'string') return null
  return `$${str.length}\r\n${str}\r\n`
}

function EncodeSimpleString (str) {
  // if (typeof str !== 'string') return null
  return `+${str}\r\n`
}

function EncodeError (str) {
  // if (typeof str !== 'string') return null
  return `-${str}\r\n`
}

function EncodeInteger (num) {
  // if (typeof str !== 'number') return null
  return `:${num}\r\n`
}

function EncodeArray (arr) {
  if (!(arr instanceof Array)) return null

  let val = `*${arr.length}\r\n`

  for (let i = 0; i < arr.length; i++) {

  }
}

module.exports = {
  EncodeSimpleString,
  EncodeInteger,
  EncodeError,
  EncodeBulkString,
  EncodeArray
}
