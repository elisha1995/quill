"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  // const { data, isLoading, isSuccess, status, isError, error } = trpc.authCallback.useQuery(undefined, {
  //   isSuccess: ({ success }) => {
  //     if (data?.success) {
  //       // user is synced to db
  //       router.push(origin ? `/${origin}` : `/dashboard`);
  //     }
  //   },
  //   onError: (err: { data: { code: string } }) => {
  //     if (err.data?.code === "UNAUTHORIZED") {
  //       router.push("/sign-in");
  //     }
  //   },
  //   retry: true,
  //   retryDelay: 500, // 500ms
  // });

  const { data, isSuccess, isError, error } = trpc.authCallback.useQuery(
    undefined,
    { retry: true, retryDelay: 500 }
  );

  if (isSuccess) {
    // user is synced to db
    return router.push(origin ? `/${origin}` : `/dashboard`);
  } else if (isError && error.data?.code === "UNAUTHORIZED") {
    return router.push("/sign-in");
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;

/* 
const { data, isLoading, isError, error } = trpc.authCallback.useQuery(undefined);

useEffect(() => {
  if (data?.success) {
    // user is synced to db
    router.push(origin ? `/${origin}` : `/dashboard`);
  } else if (isError && error?.data?.code === "UNAUTHORIZED") {
    router.push("/sign-in");
  }
}, [data, isError, error, router, origin]);

*/
