import Link from "next/link";

type BrandProps = { href?: string; className?: string };

export default function Brand({ href = "/", className = "" }: BrandProps) {
  return (
    <Link href={href} className={`brand ${className}`.trim()} aria-label="Soulcial, ir al inicio">
      <span>S</span>
      <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M10 10 30 10 30 30 10 30Z" stroke="currentColor" strokeWidth="3" />
        <circle cx="10" cy="10" r="5" fill="currentColor" />
        <circle cx="30" cy="10" r="5" fill="currentColor" />
        <circle cx="30" cy="30" r="5" fill="currentColor" />
        <circle cx="10" cy="30" r="5" fill="currentColor" />
      </svg>
      <span>ULCIAL</span>
    </Link>
  );
}
