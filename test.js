const Redis = require('ioredis')
const redis = new Redis(15000)

redis.set('foo', 'bar')
redis.get('foo')
  .then(console.log)
  .catch(console.error)
