"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { Button } from "@xionwcfm/xds/button";
import { Stack } from "@xionwcfm/xds/stack";
import { Dialog } from "~/src/components";
import { Center } from "~/src/center";
import { toast } from "@xionwcfm/xds/toast";

const DialogContext = createContext<{
  isOpen: boolean;
  dispatch: Dispatch<boolean>;
}>({ isOpen: false, dispatch: () => {} });

const reducer = (state: boolean, action: boolean) => {
  return action;
};

const Provider = ({ children }: { children: ReactNode }) => {
  const [isOpen, dispatch] = useReducer(reducer, false);
  return (
    <DialogContext.Provider value={{ isOpen, dispatch }}>
      {children}
    </DialogContext.Provider>
  );
};

export default function Page() {
  return (
    <Provider>
      <Center>
        <Dispatcher />
        <StateConsumer />
        <AnotherComponent />
      </Center>
    </Provider>
  );
}

const AnotherComponent = () => {
  toast.success("another component render");
  return <div>another component</div>;
};

const StateConsumer = () => {
  const { isOpen, dispatch } = useContext(DialogContext);
  toast.success("state consumer render");
  return <Dialog isOpen={isOpen} onClose={() => dispatch(false)} />;
};

const Dispatcher = () => {
  const { dispatch } = useContext(DialogContext);
  toast.success("dispatcher render");
  return (
    <Button variant={"emphasis"} size={"full"} onClick={() => dispatch(true)}>
      open
    </Button>
  );
};
