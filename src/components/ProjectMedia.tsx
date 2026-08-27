"use client";

import { useRef } from "react";
import Image from "next/image";

const WIDTH = 1200;
const HEIGHT = 800;

export default function ProjectMedia({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`View larger: ${alt}`}
        className="block w-full cursor-zoom-in overflow-hidden rounded-[4px] border border-rule bg-surface shadow-panel transition-[border-color] duration-150 hover:border-accent-line"
      >
        <Image
          src={src}
          alt={alt}
          width={WIDTH}
          height={HEIGHT}
          className="h-auto w-full"
        />
      </button>
      <figcaption className="mt-2 font-mono text-[0.6875rem] text-ink-dim">
        {caption}
      </figcaption>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto max-h-[90vh] max-w-[90vw] overflow-hidden rounded-[4px] border border-rule bg-surface p-0 backdrop:bg-black/70 open:flex"
        aria-label={alt}
      >
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
          className="absolute top-2 right-2 z-10 inline-flex h-[30px] w-[30px] items-center justify-center rounded-[3px] border border-rule bg-surface text-ink-dim transition-colors duration-150 hover:border-accent-line hover:text-accent"
        >
          ✕
        </button>
        <Image
          src={src}
          alt={alt}
          width={WIDTH}
          height={HEIGHT}
          className="max-h-[90vh] w-auto"
        />
      </dialog>
    </figure>
  );
}
