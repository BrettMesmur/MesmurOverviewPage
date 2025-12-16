import PageClient from '@/components/PageClient';
import { discoverImages } from '@/lib/discoverImages';

export default async function Home() {
  const discovery = await discoverImages();
  return <PageClient discovery={discovery} />;
}
