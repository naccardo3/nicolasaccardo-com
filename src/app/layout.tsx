import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const NAME = "Nicolas Accardo";
const DESCRIPTION =
  "Nicolas Accardo — software engineer. Data pipelines, internal tools, and dashboards, built and deployed end to end.";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: NAME,
    template: `%s — ${NAME}`,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: NAME,
    title: NAME,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: NAME,
    description: DESCRIPTION,
  },
};

export const viewport = {
  themeColor: "#0E1211",
};

// Reads the saved theme before first paint so the page never flashes the
// wrong palette — the classic Next.js dark-mode bug this site can't afford.
// Rendered as a raw <script> tag (not next/script) on purpose: next/script's
// `beforeInteractive` strategy queues execution through an async-loaded
// bootstrap bundle, which does not block first paint. A plain inline
// <script> in <head> is a genuine parser-blocking script, which does.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('na-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${ibmPlexSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body className="font-sans antialiased">
        <TopBar />
        <main id="top">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
