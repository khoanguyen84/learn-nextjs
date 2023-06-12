// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

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

  if (req.method !== "POST") {
    return res.status(405).json({ message: 'Method is not supported' })
  }

  return new Promise((resolve) => {
    req.headers.cookie = '';
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';
      proxyRes.on('data', (chunk) => {
        body += chunk;
      })

      proxyRes.on('end', () => {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);

          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt)
          });

          (res as NextApiResponse).status(200).json({ message: 'login successfully' });

        } catch (error) {
          (res as NextApiResponse).status(500).json({ message: 'internal server error' });
        }
        resolve(true);
      })
    }
    proxy.once('proxyRes', handleLoginResponse);

    proxy.web(req, res, {
      target: 'https://js-post-api.herokuapp.com',
      changeOrigin: true,
      selfHandleResponse: true
    })

  })
}
