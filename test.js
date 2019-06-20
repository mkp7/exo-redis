const Redis = require('ioredis')
const redis = new Redis(15000)

// redis.set('foo', 'bar').then(console.log).catch(console.error)
// redis.get('foo').then(console.log).catch(console.error)

// redis.set('foo', 'baz').then(console.log).catch(console.error)
// redis.get('foo').then(console.log).catch(console.error)

// redis.setbit('abc', 7, 1).then(console.log).catch(console.error)
// redis.setbit('abc', 1, 1).then(console.log).catch(console.error)
// redis.get('abc').then(console.log).catch(console.error)

// redis.setbit('abc', 7, 0).then(console.log).catch(console.error)
// redis.get('abc').then(console.log).catch(console.error)

// redis.getbit('abc', 1).then(console.log).catch(console.error)

// redis.setbit('abc', 2, 1).then(console.log).catch(console.error)
// redis.getbit('abc', 2).then(console.log).catch(console.error)

redis.getbit('foo', 1).then(console.log).catch(console.error)

redis.setbit('foo', 1, 0).then(console.log).catch(console.error)
redis.getbit('foo', 1).then(console.log).catch(console.error)

redis.get('foo').then(console.log).catch(console.error)

redis.getbit('foo', 1).then(console.log).catch(console.error)

redis.setbit('foo', 1, 1).then(console.log).catch(console.error)
redis.getbit('foo', 1).then(console.log).catch(console.error)

redis.get('foo').then(console.log).catch(console.error)
