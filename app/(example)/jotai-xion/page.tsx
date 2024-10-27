"use client";
import { createReusableAtom } from "@xionwcfm/jotai";
import { Button } from "@xionwcfm/xds/button";
import { toast } from "@xionwcfm/xds/toast";
import { atom } from "jotai";
import { ReactNode } from "react";
import { Center } from "~/src/center";
import { Dialog } from "~/src/components";

const dialogStore = createReusableAtom<boolean>(false);

const Provider = ({ children }: { children: ReactNode }) => {
  return <dialogStore.Provider>{children}</dialogStore.Provider>;
};

const AnotherComponent = () => {
  toast.success("another component render");
  return <div>another component</div>;
};

const StateConsumer = () => {
  const [isOpen, dispatch] = dialogStore.useAtom();
  toast.success("state consumer render");
  return <Dialog isOpen={isOpen} onClose={() => dispatch(false)} />;
};

const Dispatcher = () => {
  const dispatch = dialogStore.useSetAtom();
  toast.success("dispatcher render");
  return (
    <Button variant={"emphasis"} size={"full"} onClick={() => dispatch(true)}>
      open
    </Button>
  );
};

export default function Page() {
  return (
    <Provider>
      <Center>
        <StateConsumer />
        <Dispatcher />
        <AnotherComponent />
      </Center>
    </Provider>
  );
}
