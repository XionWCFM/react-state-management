"use client";
import { Button } from "@xionwcfm/xds/button";
import { toast } from "@xionwcfm/xds/toast";
import { atom, useAtom, useSetAtom } from "jotai";
import { Center } from "~/src/center";
import { Dialog } from "~/src/components";

export default function Page() {
  return (
    <Center>
      <Dispatcher />
      <StateConsumer />
      <AnotherComponent />
    </Center>
  );
}

const dialogAtom = atom(false);

const StateConsumer = () => {
  const [isOpen, dispatch] = useAtom(dialogAtom);
  toast.success("state consumer render");
  return <Dialog isOpen={isOpen} onClose={() => dispatch(false)} />;
};

const Dispatcher = () => {
  const dispatch = useSetAtom(dialogAtom);
  toast.success("dispatcher render");
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
