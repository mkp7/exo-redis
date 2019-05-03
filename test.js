const Redis = require('ioredis')
const redis = new Redis(15000)

redis.set('foo', 'bar')
redis.get('foo')
  .then(console.log)
  .catch(console.error)

redis.set('foo', 'baz')
redis.get('foo')
  .then(console.log)
  .catch(console.error)

redis.setbit('abc', 7, 1)
  .then(console.log)
  .catch(console.error)

redis.setbit('abc', 1, 1)
  .then(console.log)
  .catch(console.error)

redis.setbit('abc', 7, 0)
  .then(console.log)
  .catch(console.error)

redis.get('abc')
  .then(console.log)
  .catch(console.error)

redis.getbit('abc', 1)
  .then(console.log)
  .catch(console.error)
