import formidable from "formidable";
import { promises as fs } from 'fs'

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function createCompanySales (request, response) {
  const form = new formidable.IncomingForm()

  return form.parse(request, async function (_err, _fields, files) {
    const file = await fs.readFile(files.file.path, {
      encoding: 'utf8',
    })

    const companySaleRequest = await fetch(`${process.env.API_URL}/company_sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file: file }),
    })

    const companySale = await companySaleRequest.json()

    return response.status(200).json({ companySale })
  })
}
