import clsx from "clsx"
import { Badge } from "./ui/badge"

interface SearchBadge {
    resourceType: "Pessoa" | "Local"
    resourceParam: string
}

const SearchBadge = ({ resourceType, resourceParam }: SearchBadge) => {
    return (< Badge className={clsx("mr-2 text-md", 
    {"bg-lime-500":resourceType==="Pessoa","bg-cyan-500":resourceType==="Local" })} >em:{resourceType}:{resourceParam}</Badge >
    )
}

export { SearchBadge }