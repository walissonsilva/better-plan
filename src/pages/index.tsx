import { Navbar } from '../components/Navbar'
import { NextHead } from '../components/NextHead'
import { HomePage } from '../components/Pages/Home'

export default function Home() {
  return (
    <>
      <NextHead pageTitle="Home" />

      <Navbar />

      <HomePage />
    </>
  )
}
