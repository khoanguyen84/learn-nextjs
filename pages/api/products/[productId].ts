// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    payload: any,
    message: string,
    code: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ payload: null, message: 'Method is not supported', code: 405 })
    }

    const { productId } = req.query;
    
    const response = await fetch(`https://js-post-api.herokuapp.com/api/products/${productId}`);
    const result = await response.json();
    res.status(200).json({ payload: result, message: 'success', code: 200 })
}
