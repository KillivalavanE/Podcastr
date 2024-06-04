"use client"
import { leftSider } from "@/constants"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useAudio } from "@/app/providers/AudioProvider"

const LeftSideBar = () => {
  const pathname = usePathname();
  const {audio} = useAudio();
  const {signOut} = useClerk();
  const router = useRouter();
  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px)]",{'h-[calc(100vh-140px)]':audio?.audioUrl})}>
        <nav className="flex flex-col gap-6">
            <Link href="/" className="flex cursor-pointer items-center gap-2 pb-10 max-lg:justify-center">
              <Image src="/icons/logo.svg" alt="logo" width={23} height={27}/>
              <h1 className="text-24 font-extrabold text-white max-lg:hidden">Podcastr</h1>
            </Link>
            {leftSider.map((item)=>{
              const flag = pathname === item.route;
              return <Link href={item.route} key={item.label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",{
                'bg-nav-focus border-r-4 border-orange-1':flag
              })}>
                        <Image src={item.imgURL} width={24} height={24} alt="icons"/>
                        <p>{item.label}</p>
                     </Link>
            })}
        </nav>
        <SignedOut>
          <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
            <Button className="text-16 text-white-1 bg-orange-1 w-full font-extrabold" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
            <Button className="text-16 text-white-1 bg-orange-1 w-full font-extrabold" onClick={()=>signOut(()=>router.push('/'))}>
              Log out
            </Button>
          </div>
        </SignedIn>
    </section>
  )
} 

export default LeftSideBar