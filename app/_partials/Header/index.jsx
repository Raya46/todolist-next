import Link from "next/link";
import links from "./data";

export default function Header() {
  return (
    <div className="w-full px-5 py-4 flex items-center">
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl">Todo-list</h1>
        <small className="text-sm text-slate-500">Simple Todo-List app</small>
      </div>
      <nav className="ml-auto flex">
        <ul className="flex">
          <li className="w-auto h-auto">
            {links.map((link, index) => (
              <Link
                key={index}
                className="px-6 py-4 hover:border-b-4 hover:border-sky-500"
                href={link.path}
              >
                {link.label}
              </Link>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
}
