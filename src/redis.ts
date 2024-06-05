import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis, { RedisOptions } from "ioredis";

export let pubsub: RedisPubSub;

const startRedisServer = async () => {
  const { REDIS_URI } = process.env;
  if (!REDIS_URI) {
    throw new Error("REDIS_URI is not set");
  }
  const options: RedisOptions = {
    retryStrategy: (times) => Math.min(times * 50, 2000),
  };

  pubsub = new RedisPubSub({
    publisher: new Redis(REDIS_URI),
    subscriber: new Redis(REDIS_URI),
  });
};

export default startRedisServer;
