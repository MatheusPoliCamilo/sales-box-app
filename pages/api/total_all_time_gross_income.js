export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function totalAllTimeGrossIncome (request, response) {
  const totalAllTimeGrossIncomeRequest = await fetch(`${process.env.API_URL}/total_all_time_gross_income`)

  const totalAllTimeGrossIncome = await totalAllTimeGrossIncomeRequest.json()

  return response.status(200).json({ totalAllTimeGrossIncome })
}
