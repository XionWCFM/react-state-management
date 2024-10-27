"use client";
import { Button } from "@xionwcfm/xds/button";
import { toast } from "@xionwcfm/xds/toast";
import { useEffect, useState } from "react";
import { Center } from "~/src/center";
import { Dialog } from "~/src/components";

type Observer<T> = (data: T) => void;

class Observable<T> {
  private observers: Observer<T>[] = [];

  subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<T>): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: T): void {
    // biome-ignore lint/complexity/noForEach: <explanation>
    this.observers.forEach((observer) => observer(data));
  }
}

class DialogObserver extends Observable<boolean> {
  isOpen = false;
}

const dialogObservable = new DialogObserver();

const StateConsumer = () => {
  const [isOpen, setIsOpen] = useState(() => dialogObservable.isOpen);
  toast.success("state consumer render");
  useEffect(() => {
    const handleStateChange = (value: boolean) => setIsOpen(value);
    dialogObservable.subscribe(handleStateChange);
    return () => dialogObservable.unsubscribe(handleStateChange);
  }, []);
  return (
    <Dialog isOpen={isOpen} onClose={() => dialogObservable.notify(false)} />
  );
};

const Dispatcher = () => {
  toast.success("dispatcher render");
  return (
    <Button
      variant={"emphasis"}
      size={"full"}
      onClick={() => dialogObservable.notify(true)}
    >
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
    <Center>
      <StateConsumer />
      <Dispatcher />
      <AnotherComponent />
    </Center>
  );
}
