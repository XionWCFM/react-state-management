"use client";
import { Button } from "@xionwcfm/xds/button";
import { toast } from "@xionwcfm/xds/toast";
import { createContext, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { Center } from "~/src/center";
import { Dialog } from "~/src/components";

const DialogStoreContext = createContext<StoreApi<{
  isOpen: boolean;
  dispatch: (bool: boolean) => void;
}> | null>(null);

const Provider = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
}) => {
  const [store] = useState(() =>
    createStore<{ isOpen: boolean; dispatch: (bool: boolean) => void }>(
      (set) => ({
        isOpen: isOpen ?? false,
        dispatch: (value: boolean) => set({ isOpen: value }),
      })
    )
  );

  return (
    <DialogStoreContext.Provider value={store}>
      {children}
    </DialogStoreContext.Provider>
  );
};

const useDialogStore = () => {
  const store = useContext(DialogStoreContext);
  if (!store) {
    throw new Error("useDialogStore must be used within a Provider");
  }
  return store;
};

const StateConsumer = () => {
  const { isOpen, dispatch } = useStore(useDialogStore());
  toast.success("state consumer render");
  return <Dialog isOpen={isOpen} onClose={() => dispatch(false)} />;
};

const Dispatcher = () => {
  const dispatch = useStore(useDialogStore(), (state) => state.dispatch);
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
