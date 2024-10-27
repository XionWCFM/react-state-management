"use client";

import {
  Dispatch,
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { Button } from "@xionwcfm/xds/button";
import { Dialog } from "~/src/components";
import { Center } from "~/src/center";
import { toast } from "@xionwcfm/xds/toast";

const DialogContext = createContext<boolean>(false);

const DialogDispatchContext = createContext<Dispatch<boolean>>(() => {});

const reducer = (state: boolean, action: boolean) => {
  return action;
};

const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, dispatch] = useReducer(reducer, false);
  return (
    <DialogDispatchContext.Provider value={dispatch}>
      <DialogContext.Provider value={isOpen}>{children}</DialogContext.Provider>
    </DialogDispatchContext.Provider>
  );
};

export default function Page() {
  return (
    <DialogProvider>
      <Center>
        <Dispatcher />
        <StateConsumer />
        <AnotherComponent />
      </Center>
    </DialogProvider>
  );
}

const StateConsumer = () => {
  const isOpen = useContext(DialogContext);
  const dispatch = useContext(DialogDispatchContext);
  toast.success("state consumer render");
  return <Dialog isOpen={isOpen} onClose={() => dispatch(false)} />;
};

const Dispatcher = () => {
  const dispatch = useContext(DialogDispatchContext);
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
