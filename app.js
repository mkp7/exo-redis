const net = require('net')
const processCommands = require('./')

function onRedisConn (con) {
  console.log('client connected')

  let bulkBuf = Buffer.from('')
  con.on('data', buf => {
    bulkBuf = Buffer.concat([bulkBuf, buf])
    bulkBuf = processCommands(bulkBuf.toString(), con)
  })

  con.on('end', () => {
    console.log('client disconnected')
  })
}

// store commands in a sort of queue?
// execute commands
// generate and return response

const server = net.createServer(onRedisConn)

server.on('error', err => {
  throw err
})

server.listen(15000, () => {
  console.log('server bound')
})
