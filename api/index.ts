import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
let routesInitialized = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!routesInitialized) {
    await registerRoutes(app);
    routesInitialized = true;
  }
  
  // Convert Vercel request/response to Express format
  return new Promise((resolve) => {
    const expressReq = req as any;
    const expressRes = res as any;
    
    app(expressReq, expressRes, () => {
      if (!expressRes.headersSent) {
        resolve(undefined);
      }
    });
  });
}
