import { VT323, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Kien Ngo — Full-Stack Engineer",
  description:
    "Portfolio of Kien Ngo, a full-stack engineer building things you can actually play with: a multiplayer poker table, an AI chatbot, and a pseudo-3D racing game.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${vt323.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="scanlines min-h-screen flex flex-col bg-bg text-text font-body antialiased">
        {children}
      </body>
    </html>
  );
}
