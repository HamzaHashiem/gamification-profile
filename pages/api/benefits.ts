// API route for benefits data
import type { NextApiRequest, NextApiResponse } from "next";
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const jsonDirectory = path.join(process.cwd(), 'public/data');
    const fileContents = await fs.readFile(jsonDirectory + '/benefits.json', 'utf8');
    const data = JSON.parse(fileContents);

    await new Promise(resolve => setTimeout(resolve, 500));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load benefits data' });
  }
}
