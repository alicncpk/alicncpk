import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Ali CNC Pakistan | High-Precision 3D Modeling & CNC Specialist",
    template: "%s | Ali CNC Pakistan"
  },
  description: "Expert High-Precision 3D Modeling, CNC Fabrication, and CAD Design services by Muhammad Ali in Rawalpindi, Pakistan. Specialized in DFM and CNC Programming.",
  keywords: ["CNC Pakistan", "3D Modeling", "CAD Design", "CNC Fabrication", "Rawalpindi CNC", "Precision Engineering"],
  authors: [{ name: "Muhammad Ali" }],
  creator: "Muhammad Ali",
  icons: {
    icon: "/logo_final.png",
    apple: "/logo_final.png",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://alicncpk.com",
    title: "Ali CNC Pakistan | High-Precision 3D Modeling & CNC Specialist",
    description: "Expert CNC Fabrication and 3D Modeling services in Rawalpindi, Pakistan.",
    siteName: "Ali CNC Pakistan",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5KPVVCZD');`,
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="icon" href="/logo_final.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6a01ab186a19e61c359850c8/1job88mk6';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5KPVVCZD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>
          <div className="app-container">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
