'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { leftSider } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
const Mobilenav = () => {
  const pathname = usePathname();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" alt="hamburger" width={30} height={30} className="cursor-pointer"/>
        </SheetTrigger>
        <SheetContent side='left' className="border-none bg-black-1">
            <Link href="/" className="flex cursor-pointer items-center gap-2 pb-10 pl-4">
              <Image src="/icons/logo.svg" alt="logo" width={23} height={27}/>
              <h1 className="text-24 font-extrabold text-white-1 ml-2">Podcastr</h1>
            </Link>
            <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
              <SheetClose asChild>
                <nav className="flex flex-col h-full gap-6 text-white-1">
                {leftSider.map((item)=>{
                  const flag = pathname === item.route;
                  return <SheetClose asChild key={item.label}><Link href={item.route} key={item.label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start",{
                    'bg-nav-focus border-r-4 border-orange-1':flag
                  })}>
                            <Image src={item.imgURL} width={24} height={24} alt="icons"/>
                            <p>{item.label}</p>
                         </Link></SheetClose>
                })}
                </nav>
              </SheetClose>
            </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default Mobilenav