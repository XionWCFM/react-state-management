"use client";

import { Button } from "@xionwcfm/xds/button";
import { toast } from "@xionwcfm/xds/toast";
import { useState } from "react";
import { Center } from "~/src/center";
import { Dialog } from "~/src/components";

export default function Page() {
  const [isOpen, dispatch] = useState(false);

  return (
    <Center>
      <StateConsumer isOpen={isOpen} dispatch={dispatch} />
      <Dispatcher dispatch={dispatch} />
      <AnotherComponent />
    </Center>
  );
}

const StateConsumer = ({
  isOpen,
  dispatch,
}: {
  isOpen: boolean;
  dispatch: (value: boolean) => void;
}) => {
  toast.success("state consumer render");
  return <Dialog isOpen={isOpen} onClose={() => dispatch(false)} />;
};

const Dispatcher = ({ dispatch }: { dispatch: (value: boolean) => void }) => {
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
