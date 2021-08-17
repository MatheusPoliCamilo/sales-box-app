import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function createCompanySales (request, response) {
  const form = new formidable.IncomingForm()

  return form.parse(request, async function (_err, _fields, files) {
    const companySaleRequest = await fetch(`${process.env.API_URL}/company_sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ file_path: files.file.path }),
    })

    const companySale = await companySaleRequest.json()

    return response.status(200).json({ companySale })
  })
}
