import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LanguageProvider } from './context/languageContext'; // Adjust the path as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kuku Fm - Made in India |",
  description: "Audiobooks, Stories in Hindi & Marathi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
