import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nicolas Accardo — software engineer";

// Same palette as the site (CLAUDE.md dark tokens), copied here rather than
// imported since this renders in an isolated Satori environment that can't
// read globals.css.
const GROUND = "#0E1211";
const INK = "#E6EAE7";
const INK_MID = "#B3BDB8";

export default async function Image() {
  const fontDir = join(process.cwd(), "src/app/og-fonts");
  const [semibold, regular] = await Promise.all([
    readFile(join(fontDir, "IBMPlexMono-SemiBold.ttf")),
    readFile(join(fontDir, "IBMPlexMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: GROUND,
      }}
    >
      <div
        style={{
          fontFamily: "IBM Plex Mono",
          fontWeight: 600,
          fontSize: 64,
          letterSpacing: "-0.03em",
          color: INK,
        }}
      >
        Nicolas Accardo
      </div>
      <div
        style={{
          fontFamily: "IBM Plex Mono",
          fontWeight: 400,
          fontSize: 32,
          marginTop: 28,
          maxWidth: 920,
          color: INK_MID,
        }}
      >
        I build software that ends up running somewhere.
      </div>
    </div>,
    {
      width: size.width,
      height: size.height,
      fonts: [
        { name: "IBM Plex Mono", data: semibold, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
