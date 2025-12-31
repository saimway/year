import { setupApp } from '../server/index';
import { type Request, type Response } from 'express';

export default async function handler(req: Request, res: Response) {
  const app = await setupApp();
  // @ts-ignore
  return app(req, res);
}
