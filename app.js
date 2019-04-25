const net = require('net')
const __store__ = new Map()

// parse commands
// store commands in a sort of queue?
// execute commands
// generate and return response

const server = net.createServer(c => {
  console.log('client connected')

  let buf = Buffer.from('')
  c.on('end', () => {
    console.log('client disconnected')
  })

  c.on('data', b => {
    buf = Buffer.concat([buf, b])
    console.log(b.toString())
  })
})

server.on('error', err => {
  throw err
})

server.listen(15000, () => {
  console.log('server bound')
})
