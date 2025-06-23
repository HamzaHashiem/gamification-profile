import { Benefits } from '@/components/sections/benefits';
import { Header } from '@/components/sections/header';
import { ProfileCard } from '@/components/sections/profile-card';
import { Rewards } from '@/components/sections/rewards';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Game Profile</title>
        <meta name="description" content="A beautiful gamification profile dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
          <div className="space-y-6 sm:space-y-8">
            <ProfileCard />
            <Rewards />
            <Benefits />
          </div>
        </main>
      </div>
    </>
  );
}