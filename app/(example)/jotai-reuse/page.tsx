"use client";

import { Button } from "@xionwcfm/xds/button";
import { toast } from "@xionwcfm/xds/toast";
import { useAtom, useSetAtom } from "jotai";
import { PrimitiveAtom } from "jotai";
import { atom } from "jotai";
import { createContext, ReactNode, useContext, useState } from "react";
import { Center } from "~/src/center";
import { Dialog } from "~/src/components";

const DialogAtomContext = createContext<PrimitiveAtom<boolean> | null>(null);

const Provider = ({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen?: boolean;
}) => {
  const [dialogAtom] = useState(() => atom(isOpen ?? false));
  return (
    <DialogAtomContext.Provider value={dialogAtom}>
      {children}
    </DialogAtomContext.Provider>
  );
};

const StateConsumer = () => {
  const dialogAtom = useContext(DialogAtomContext);
  toast.success("state consumer render");
  if (!dialogAtom) {
    throw new Error("DialogAtomContext is not provided");
  }
  const [isOpen, dispatch] = useAtom(dialogAtom);
  return <Dialog isOpen={isOpen} onClose={() => dispatch(false)} />;
};

const Dispatcher = () => {
  const dialogAtom = useContext(DialogAtomContext);
  toast.success("dispatcher render");
  if (!dialogAtom) {
    throw new Error("DialogAtomContext is not provided");
  }
  const dispatch = useSetAtom(dialogAtom);
  return (
    <Button variant={"emphasis"} size={"full"} onClick={() => dispatch(true)}>
      open
    </Button>
  );
};

const AnotherComponent = () => {
  toast.success("another component render");
  return <div>another component</div>;
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
