import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Roboto_Mono } from 'next/font/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from '@/react-query';

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--ff-roboto_mono',
  weight: ['400', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${roboto_mono.variable}`}>
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
