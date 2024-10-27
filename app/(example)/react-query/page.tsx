"use client";
import { Center } from "~/src/center";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { wrap } from "@suspensive/react";

export default function Page() {
  return (
    <Center>
      <SuspenseList />
    </Center>
  );
}

const SuspenseList = wrap
  .Suspense({ fallback: null })
  .ErrorBoundary({ fallback: null })
  .on(() => {
    const { data } = useSuspenseQuery(exampleQueryOptions());
    return <div>{data}</div>;
  });

const exampleQueryOptions = () =>
  queryOptions({
    queryKey: ["todos"],
    queryFn: async () => "data",
  });
