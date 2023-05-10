import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis, { RedisOptions } from "ioredis";

export let pubsub: RedisPubSub;

const startRedisServer = async () => {
  const { REDIS_DOMAIN, REDIS_PORT, REDIS_USER, REDIS_PW } = process.env;

  const options: RedisOptions = {
    retryStrategy: (times) => Math.min(times * 50, 2000),
    username: REDIS_USER,
    password: REDIS_PW,
    port: Number(REDIS_PORT),
    host: String(REDIS_DOMAIN),
  };

  pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  });
};

export default startRedisServer;
