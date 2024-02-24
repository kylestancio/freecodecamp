import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Markdown Previewer",
  description: "Markdown Previewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-200">
        <header className="h-16 bg-zinc-100 shadow-sm flex">
          <div className="m-auto">
            <p className="text-center text-xl font-bold">Markdown Previewer </p>
            <p className="text-center text-sm font-normal">By Kyle Stephen Tancio</p>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
