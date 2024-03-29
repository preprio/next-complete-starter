import client from '@/services/apollo-client';
import { GetNavigation } from '@/queries/get-navigation';
import MainNavigation from '@/components/main-navigation';

export const revalidate = 0;

async function getData() {
  const { data } = await client.query({
    query: GetNavigation,
  });

  return data;
}

export default async function Page() {
  const data = await getData();

  return <MainNavigation navigation={data.Navigation} />;
}
