// No custom domain is set yet (deferred per the build plan). Falls back to
// Vercel's stable assigned production URL, then the current deployment's own
// (ephemeral, per-build) URL, then localhost. Once a domain is picked,
// setting NEXT_PUBLIC_SITE_URL in Vercel is the only change needed — nothing
// here has to move.
//
// VERCEL_PROJECT_PRODUCTION_URL (not VERCEL_URL) is what actually gives the
// stable domain — VERCEL_URL is scoped to whichever specific deployment
// built the page, which produces broken-looking canonical/OG URLs on every
// redeploy if used as the primary fallback.
const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");
