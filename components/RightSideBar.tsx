'use client'
import { SignedIn, UserButton, useUser } from "@clerk/nextjs"
import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Carousel from "./Carousel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import LoaderSpinner from "./LoaderSpinner";
import { cn } from "@/lib/utils";
import { useAudio } from "@/app/providers/AudioProvider";

const RightSideBar = () => {
  const {user} = useUser();
  const router = useRouter();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const  {audio} = useAudio();
  // if(!topPodcasters)  return <LoaderSpinner />
  return (
    <section className={cn("right_sidebar text-white-2 h-[calc(100vh-5px)]",{'h-[calc(100vh-140px)]':audio?.audioUrl})}>
  
        <SignedIn>
          <Link href={`/profile/${user?.id}`} className="flex items-center justify-center gap-3 pb-12">
            <UserButton />
            <div className="flex w-full items-center justify-between">
              <h1 className="text-16 font-semibold truncate text-white-1">{user?.firstName} {user?.lastName}</h1>
              <Image src="/icons/right-arrow.svg" width={24} height={24} alt="right"/>
            </div>
          </Link>
        </SignedIn>
        <section>
          <Header headerTitle="Fans also like"/>
          <Carousel fansLikeDetails={topPodcasters}/>
        </section>
        <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Podcasters"/>
        <div className="flex flex-col gap-6">
          {topPodcasters?.slice(0,4).map((item)=>(
            <div key={item._id} className="flex cursor-pointer justify-between" onClick={()=>{router.push(`/profile/${item.clerkId}`)}}>
              <figure className="flex items-center gap-2">
                <Image src={item.imgURL} width={44} height={44} alt="profile-icon" className="rounded-lg aspect-square"/>
                <h2 className="text-14 font-semibold text-white-1">{item.name}</h2>
              </figure>
              <div className="flex items-center"> 
                <p className='text-12 font-normal'>
                  {item.totalPodcasts} {item.totalPodcasts > 1 ? 'podcasts' : 'podcast'} 
                </p> 
              </div>
            </div>
          ))}
        </div>
        </section>
    </section>
  )
}

export default RightSideBar