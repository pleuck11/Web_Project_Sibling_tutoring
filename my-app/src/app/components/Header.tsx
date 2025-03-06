"use client";
import Link from "next/link";
import NavLink from "./Nav-link";
import { removeAccessToken } from "@/app/utils/actions";

const links = [
  { href: "/", label: "Home" },
  { href: "/our-team", label: "Our Team" },
  { href: "/about-us", label: "About Us" }
];

const authLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" }
];

export default function Header( user: any ) {
  const logout = () => { removeAccessToken(); }

  return (
    <header className="bg-black text-white">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" key="home-link">GG</Link>

        <ul className="flex gap-4">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </ul>

        <ul className="flex gap-4">
          {user && user.user ? (
            <>
              <div className="text-white">{user.user?.username}</div>
              <div className="cursor-pointer" onClick={logout}>
                Log Out
              </div>
            </>
          ) : (
            authLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))
          )}
        </ul>
      </nav>
    </header>
  );
}
