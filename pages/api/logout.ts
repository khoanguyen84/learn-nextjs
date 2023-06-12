// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies';

interface Data {
  message: string
}
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'method is not supported' })
  }

  const cookies = new Cookies(req, res);
  cookies.set('access_token');
  res.status(200).json({ message: 'logout successfully' });
}
