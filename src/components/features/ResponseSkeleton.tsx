import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

export default function ResponseSkeleton() {
  return (
    <div className="flex gap-14 flex-col w-full">
      <div className="flex gap-5 w-full">
        <Avatar className="size-6">
          <AvatarImage src="https://cdn-icons-png.flaticon.com/128/10479/10479785.png" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4 w-full">
          <p className="font-semibold leading-none">AI</p>
          <Skeleton className="h-5 bg-slate-200 w-full" />
          <Skeleton className="h-5 bg-slate-200 w-full" />
          <Skeleton className="h-5 bg-slate-200 w-full" />
        </div>
      </div>
    </div>
  );
}
