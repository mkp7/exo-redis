const net = require('net')

const server = net.createServer(c => {
  console.log('client connected')

  c.on('end', () => {
    console.log('client disconnected')
  })
})

server.on('error', err => {
  throw err
})

server.listen(15000, () => {
  console.log('server bound')
})
