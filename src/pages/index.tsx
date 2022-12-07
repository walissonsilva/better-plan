import { Navbar } from '../components/Navbar'
import { NextHead } from '../components/NextHead'

export default function Home() {
  return (
    <>
      <NextHead pageTitle="Home" />

      <Navbar />

      <h1>Opa!</h1>
    </>
  )
}
