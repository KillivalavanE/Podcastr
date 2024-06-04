'use client'
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import Searchbar from "@/components/Searchbar";
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

const Discover = ({searchParams: {search}}:{searchParams:{search:string}}) => {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch,{search: search || ''});

  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">{!search ? 'Discover Trending Podcasts' : 'Search results for'} {search && <span className="text-white-2">{search}</span>}</h1>
        {podcastsData ? (
            <>
              {podcastsData.length>0 ? (
                <div className="podcast_grid">
                  {podcastsData?.map(({_id, podcastTitle, imgUrl,podcastDescription})=>(
                    <PodcastCard key={_id} imgUrl={imgUrl} title={podcastTitle} description={podcastDescription} podcastId={_id}/>
                  ))}
                </div>
              ): <EmptyState title="No Results Found"/>}
            </>
        ): <LoaderSpinner />
        }
      </div>

    </div>
  )
}

export default Discover