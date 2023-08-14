import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Epilogue, Inter } from 'next/font/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from '@/react-query';

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--ff-epilogue',
  weight: ['400', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--ff-inter',
  weight: ['400', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${epilogue.variable} body`}>
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
