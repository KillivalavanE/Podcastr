"use client"
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react"
import Image from "next/image"

const PodcastDetails = ({params} : {params : {podcastId: Id<'podcasts'>}}) => {
  const {user} = useUser();
  const podcast = useQuery(api.podcasts.getPodcastById,{
    podcastId:params.podcastId
  });

  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType,{
    podcastId:params.podcastId
  });

  if(!similarPodcasts || !podcast){
    return <LoaderSpinner />
  }
  const isOwner = user?.id === podcast?.authorId;
  return (
    <section className="flex flex-col w-full">
      <header className="flex items-center justify-between mt-9">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3">
          <Image src="/icons/headphone.svg" width={24} height={24} alt="head"/>
          <h2 className="text-16 font-bold text-white-1">{podcast?.views}</h2>
        </figure>
      </header>
      <PodcastDetailPlayer isOwner={isOwner} podcastId={podcast._id} {...podcast}/>
      <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">{podcast?.podcastDescription}</p>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">{podcast?.voicePrompt}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-white-2">{podcast?.imagePrompt}</p>
        </div>
      </div>

      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Products</h1>
          {similarPodcasts && similarPodcasts.length>0 ? (
            <div>
              {similarPodcasts?.map(({_id, podcastTitle, imgUrl,podcastDescription})=>(
                <PodcastCard key={_id} imgUrl={imgUrl} title={podcastTitle} description={podcastDescription} podcastId={_id}/>
              ))}
            </div>
          ) : (
            <>
              <EmptyState title="No Similar Podcasts Found" buttonLink="/discover" buttonText="Discover more podcasts"/>
            </>
          )}
        
      </section>
    </section>
  )
}

export default PodcastDetails