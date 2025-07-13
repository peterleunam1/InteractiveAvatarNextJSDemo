"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { BurguerIcon, GithubIcon, HeyGenLogo } from "./Icons";

const navItems = [
  { label: "Avatars", href: "https://labs.heygen.com/interactive-avatar" },
  { label: "Voices", href: "https://docs.heygen.com/reference/list-voices-v2" },
  { label: "API Docs", href: "https://docs.heygen.com/reference/new-session-copy" },
  { label: "Guide", href: "https://help.heygen.com/en/articles/9182113-interactive-avatar-101-your-ultimate-guide" },
];

const githubItem = {
  label: "SDK",
  href: "https://github.com/HeyGen-Official/StreamingAvatarSDK",
  icon: <GithubIcon className="w-4 h-4" />,
};

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header className="relative z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + título */}
        <Link
          href="https://app.heygen.com/"
          target="_blank"
          className="flex items-center gap-3"
        >
          <HeyGenLogo />
          <span className="hidden sm:inline text-lg font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            HeyGen SDK Demo
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          <NavLinks />
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-[5px] p-2"
          >
            <BurguerIcon />
          </button>

          {open && (
            <div
              id="mobile-menu"
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 text-sm font-medium transition-all animate-fade-in"
            >
              <MobileLinks onClick={() => setOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLinks() {
  const linkClass =
    "hover:text-indigo-500 transition-colors duration-200 ease-in-out";
  const target = "_blank";

  return (
    <>
      {navItems.map(({ label, href }) => (
        <Link key={label} href={href} target={target} className={linkClass}>
          {label}
        </Link>
      ))}
      <Link
        href={githubItem.href}
        target={target}
        className="flex items-center gap-1 hover:text-indigo-500 transition-colors duration-200"
      >
        {githubItem.icon}
        {githubItem.label}
      </Link>
    </>
  );
}

function MobileLinks({ onClick }: { onClick: () => void }) {
  const itemClass =
    "block px-4 py-2 hover:bg-gray-100 text-gray-700 transition-colors duration-150";

  return (
    <>
      {navItems.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          className={itemClass}
          onClick={onClick}
        >
          {label}
        </Link>
      ))}
      <Link
        href={githubItem.href}
        target="_blank"
        className={`${itemClass} flex items-center gap-1`}
        onClick={onClick}
      >
        {githubItem.icon}
        {githubItem.label}
      </Link>
    </>
  );
}
