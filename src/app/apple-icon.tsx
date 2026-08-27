import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const semibold = await readFile(
    join(process.cwd(), "src/app/og-fonts/IBMPlexMono-SemiBold.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0E1211",
        color: "#6FB49A",
        fontFamily: "IBM Plex Mono",
        fontWeight: 600,
        fontSize: 84,
      }}
    >
      NA
    </div>,
    {
      width: size.width,
      height: size.height,
      fonts: [
        { name: "IBM Plex Mono", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
