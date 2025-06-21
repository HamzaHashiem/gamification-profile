import Head from 'next/head';
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';

type HomeProps = {
  data: {
    message: string;
  };
};

export default function Home({ data }: HomeProps) {
  const { isDarkMode, isThemeLoaded } = useTheme();
  
  // Use a neutral style before theme is loaded to prevent flashing
  const bgColor = !isThemeLoaded ? '#f5f5f5' : (isDarkMode ? '#1a1a1a' : '#ffffff');
  const textColor = !isThemeLoaded ? '#333333' : (isDarkMode ? '#ffffff' : '#1a1a1a');
  
  return (<>
    <Head>
      <title>My Next.js App</title>
      <meta name="description" content="A simple Next.js application" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <section style={{ 
      backgroundColor: bgColor,
      color: textColor,
      padding: '20px',
      minHeight: '100vh',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      <div className="flex justify-between align-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome to My Next.js App</h1>
          <p className="mb-6">{data.message}</p>
        </div>
        
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </section>
  </>);
}

export async function getServerSideProps() {
  // from API
  // const req = await fetch('https://api.example.com/data');
  // const apiData = await req.json();

  const data = {
    message: "This is static data fetched at build time."
  };

  return {
    props: {
      data
    }
  };
}