const net = require('net')
const { ParseArray } = require('./parsers')
const commands = require('./commands')
const __store__ = new Map()

// parse commands
const processCommands = (str, con) => {
  const val = ParseArray(str)

  if (val === null) return Buffer.from(str)

  console.log(val)

  const cmd = val[0]

  if (commands[cmd[0].toUpperCase()] === undefined) {
    con.write(`-Unknown command '${cmd[0]}'\r\n`)
  } else {
    con.write(commands[cmd[0].toUpperCase()](cmd, __store__))
  }

  return processCommands(val[1], con)
}

// store commands in a sort of queue?
// execute commands
// generate and return response

const server = net.createServer(con => {
  console.log('client connected')

  let bulkBuf = Buffer.from('')
  con.on('data', buf => {
    bulkBuf = Buffer.concat([bulkBuf, buf])
    bulkBuf = processCommands(bulkBuf.toString(), con)
  })

  con.on('end', () => {
    console.log('client disconnected')
  })
})

server.on('error', err => {
  throw err
})

server.listen(15000, () => {
  console.log('server bound')
})
