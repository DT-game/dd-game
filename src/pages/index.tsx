import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { GlobalLayout } from '../layouts/global-layout'

const Home: NextPage = () => {
  return (
    <GlobalLayout>
      <div>Homepage</div>
    </GlobalLayout>
  )
}

export default Home
