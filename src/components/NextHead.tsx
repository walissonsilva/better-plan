import Head from 'next/head'

interface NextHeadProps {
  pageTitle: string
}

export function NextHead({ pageTitle }: NextHeadProps) {
  return (
    <Head>
      <title>{`${pageTitle} | Weekly Planner`}</title>
    </Head>
  )
}
