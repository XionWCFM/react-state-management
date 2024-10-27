"use client";

import { Button } from "@xionwcfm/xds/button";
import { toast } from "@xionwcfm/xds/toast";
import { useEffect, useState } from "react";
import { Center } from "~/src/center";
import { Dialog } from "~/src/components";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type DefaultFunction = (...param: any[]) => void;
class Pubsub<EventName extends string = string> {
  private events: Record<string, DefaultFunction[]>;
  constructor() {
    this.events = {};
  }
  subscribe(eventName: EventName, func: DefaultFunction) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    //@ts-ignore
    this.events[eventName].push(func);
  }
  unsubscribe(eventName: EventName, func: DefaultFunction) {
    const handlers = this.events[eventName];
    if (handlers) {
      this.events[eventName] = handlers.filter((handler) => handler !== func);
    }
  }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  publish<T = Record<string, any>>(eventName: EventName, context?: T) {
    if (!this.events[eventName]) {
      return;
    }
    //@ts-ignore
    // biome-ignore lint/complexity/noForEach: <explanation>
    this.events[eventName].forEach((func) => func(context));
  }
  clear(eventName?: EventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }
}

const pubsub = new Pubsub<"dispatch">();

const StateConsumer = () => {
  const [isOpen, dispatch] = useState(false);
  toast.success("state consumer render");
  useEffect(() => {
    const handler = (value: boolean) => {
      dispatch(value);
    };
    pubsub.subscribe("dispatch", handler);
    return () => pubsub.unsubscribe("dispatch", handler);
  }, []);

  return (
    <Dialog isOpen={isOpen} onClose={() => pubsub.publish("dispatch", false)} />
  );
};

const Dispatcher = () => {
  toast.success("dispatcher render");
  return (
    <Button
      variant={"emphasis"}
      size={"full"}
      onClick={() => pubsub.publish("dispatch", true)}
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
