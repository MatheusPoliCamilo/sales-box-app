import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [totalGrossIncome, setTotalGrossIncome] = useState(0.0)
  const [totalAllTimeGrossIncome, setTotalAllTimeGrossIncome] = useState(0.0)

  useEffect(() => {
    fetch(`/api/total_all_time_gross_income`)
    .then((response) => {
      response.json().then(({ totalAllTimeGrossIncome }) => {
        setTotalAllTimeGrossIncome(totalAllTimeGrossIncome)
      })
    })
  }, [totalGrossIncome])

  return (
    <div className={styles.container}>
      <Head>
        <title>SalesBox</title>
        <meta name="description" content="SalesBox application for import the company sales files" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <b>SalesBox</b>
          <Image src="/logo.png" alt="SalesBox Logo" width={77} height={69} />
        </h1>

        <p className={styles.description}>
        Import your company sales here.
        </p>

        <div className='columns mt-6'>
          <div className='column'>
            <form onSubmit={(event) => {
              event.preventDefault()
              const importButton = document.querySelector('#import-button')

              importButton.classList.add('is-loading')

              const file = document.querySelector('.file-input').files[0]

              const formData = new FormData()
              formData.append('file', file)

              fetch(`/api/company_sales`, {
                method: 'POST',
                body: formData,
              }).then((response) => {
                response.json().then(({ companySale }) => {
                  setTotalGrossIncome(companySale.total_gross_income)
                })
              }).then(() => {
                importButton.classList.remove('is-loading')
              })
            }}>
              <div className='field'>
                <div className='control'>
                  <div className="file is-large is-link has-name is-boxed">
                    <label className="file-label">
                      <input className="file-input" type="file" name="file" onChange={(event) => {
                        const fileName = document.querySelector('.file-name');

                        if (event.target.files.length > 0) {
                          fileName.textContent = event.target.files[0].name;
                        } else {
                          fileName.textContent = 'No file selected'
                        }
                      }} />
                      <span className="file-cta">
                        <span className="file-icon">
                          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-file-upload fa-w-12 fa-3x"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z" className=""></path></svg>
                        </span>

                        <span className="file-label">
                          Select your sales file
                        </span>
                      </span>

                      <span className="file-name is-flex is-justify-content-center">
                        No file selected
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className='field is-flex is-justify-content-center'>
                <div className='control'>
                  <button className='button is-large is-link' id='import-button'>Import</button>
                </div>
              </div>
            </form>
          </div>

          <div className='column is-flex is-flex-direction-column is-justify-content-center'>
            <nav className="level">
              <div className='ml-6 is-hidden-mobile'></div>

              <div className="level-item has-text-centered">
                <div>
                  <p className="heading title is-6">Total gross income</p>
                  <p className="heading title is-6">Last import</p>
                  <p className="title">R$ {totalGrossIncome}</p>
                </div>
              </div>
            </nav>
          </div>

        </div>

        <nav className="level mt-6 pt-5">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading title is-5">Total all-time gross income</p>
              <p className="title">R$ {totalAllTimeGrossIncome}</p>
            </div>
          </div>
        </nav>
      </main>
    </div>
  )
}
