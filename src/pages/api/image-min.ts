import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  if(req.method === "POST"){
    const form = new IncomingForm()

    await new Promise(function(resolve, reject) {
      form.parse(req, async (err, fields, { files }) => {
        if(!files || files.length === 0) return res.status(400).json({ message: 'No file uploaded' })
  
        const filePath = files.map(file => file.filepath)
  
        const buffer = await imagemin(filePath, {
          plugins: [
              imageminWebp({quality: 50})
          ]
        })
  
        const newImage = Buffer.from(buffer[0].data)
  
        res.setHeader('Content-Type', 'image/webp')
        res.setHeader('Content-Length', newImage.length)
        res.send(newImage)
      });
  
      form.on('error', (err) => {
        console.log(err)
        res.status(500).json({ message: err.message })
      })
  });

  res.json({ message: "success" });
  }else{
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}