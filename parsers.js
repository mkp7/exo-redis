const parsers = [ParseSimpleString, ParseInteger, ParseBulkString, ParseArray]
const ParseValue = (inp, parsers) => {
  for (let i = 0; i < parsers.length; i++) {
    const v = parsers[i](inp)
    if (v !== null) return v
  }

  return null
}

function ParseSimpleString (inp) {
  const match = /^\+(.+)\r\n/.exec(inp)

  if (match === null) return null

  return [match[1], inp.slice(match[0].length)]
}

function ParseInteger (inp) {
  const match = /^:(0|([1-9][0-9]*))\r\n/.exec(inp)

  if (match === null) return null

  return [parseInt(match[1]), inp.slice(match[0].length)]
}

function ParseBulkString (inp) {
  const match = /^\$(0|([1-9][0-9]*))\r\n/.exec(inp)

  if (match === null) return null

  const len = parseInt(match[1])
  inp = inp.slice(match[0].length)

  if (inp.length < len + 2 || (inp[len] !== '\r' && inp[len + 1] !== '\n')) return null

  return [inp.slice(0, len), inp.slice(len + 2)]
}

function ParseArray (inp) {
  const match = /^\*(0|([1-9][0-9]*))\r\n/.exec(inp)

  if (match === null) return null

  const len = parseInt(match[1])
  inp = inp.slice(match[0].length)

  let i = 0
  let arr = new Array(len)

  let val = ParseValue(inp, parsers)

  while (i < len && val !== null) {
    arr[i] = val[0]
    inp = val[1]
    val = ParseValue(inp, parsers)
    i++
  }

  if (i < len) return null

  return [arr, inp]
}

module.exports = {
  ParseSimpleString,
  ParseInteger,
  ParseBulkString,
  ParseArray
}
