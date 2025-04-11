import { Environment, Paddle } from "@paddle/paddle-node-sdk";

export const paddle = new Paddle(process.env.NEXT_PUBLIC_CLIENT_TOKEN, {
  environment: Environment.sandbox,
});

