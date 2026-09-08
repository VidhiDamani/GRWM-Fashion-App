import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'GRWM • Fashion Wardrobe & Outfit Recommendation App',
  description: 'Digital wardrobe management and outfit recommendation app for Indian college girls. Get instant suggestions for college, Diwali, Garba, weddings, and trips.',
  keywords: ['fashion', 'wardrobe app', 'outfit recommendation', 'indian fashion', 'college outfits', 'garba outfits', 'diwali fashion'],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0b0914" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22 font-family=%22sans-serif%22 font-weight=%22bold%22 fill=%22%23e0a96d%22>G</text></svg>" />
      </head>
      <body className="bg-fashion-dark text-slate-100 min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
        <Header />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
