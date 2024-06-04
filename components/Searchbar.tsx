import Image from "next/image"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@/lib/useDebounce";

const Searchbar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const debouncedValue = useDebounce(search,500);
  useEffect(() => {
    if(debouncedValue.length>0){
        router.push(`/discover?search=${debouncedValue}`);
    }
    else if(!debouncedValue && pathname==='/discover'){
        router.push('/discover')
    }
  }, [router,pathname,debouncedValue])
  
  return (
    <div className="relative mt-10 block">
        <Input value={search} onChange={(e)=>setSearch(e.target.value)} className="input-class py-6 pl-12 focus-visible:ring-orange-1" placeholder="Search for podcasts"/>
        <Image src="/icons/search.svg" alt="search" width={20} height={20} className="absolute left-4 top-3.5"/>
    </div>
  )
}

export default Searchbar