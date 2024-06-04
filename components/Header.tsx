import { cn } from "@/lib/utils"
import Link from "next/link"

const Header = ({headerTitle, titleClassName}:{headerTitle?:string,titleClassName?:string}) => {
  return (
    <header className={cn("flex items-center justify-between",titleClassName)}>
        {headerTitle ? (
            <h1 className="text-18 font-bold text-white-1">{headerTitle}</h1>
        ): (
            <div />)}
        <Link href="/discover" className="text-16 text-orange-1 font-semibold">See all</Link>
    </header>
  )
}

export default Header