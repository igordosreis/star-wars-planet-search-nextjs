import Head from 'next/head';

import Table from '@/components/Table';
import FilterForm from '@/components/FilterForm';

import StarWars from '../assets/star-wars.svg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Star Wars Planets Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StarWars className="sw-logo" />
      <section className="table-form container">
        <FilterForm />
        <Table />
      </section>
    </>
  );
}
