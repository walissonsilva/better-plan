import Link from 'next/link'
import { MdKeyboardArrowDown } from 'react-icons/md'

export function Navbar() {
  return (
    <header className="bg-sky-900 w-screen h-20">
      <nav className="flex items-center justify-between h-full text-white px-4 lg:px-8">
        <Link href="/">
          <span className="text-4xl font-semibold font-brand">Better Plan</span>
          <sub className="ml-2 mt-2 uppercase text-[10px]">beta</sub>
        </Link>

        <ul className="list-none flex gap-4">
          <li className="flex gap-2 items-center">
            Bem-vindo(a) ao Better Plan!
            <MdKeyboardArrowDown />
          </li>
        </ul>
      </nav>
    </header>
  )
}
