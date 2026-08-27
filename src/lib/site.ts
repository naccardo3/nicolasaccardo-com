// No custom domain is set yet (deferred per the build plan). Falls back to
// the Vercel deployment URL in production, localhost in dev. Once a domain
// is picked, setting NEXT_PUBLIC_SITE_URL in Vercel is the only change
// needed — nothing here has to move.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
