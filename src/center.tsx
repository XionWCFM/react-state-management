import { toast } from "@xionwcfm/xds/toast";
import { Button } from "@xionwcfm/xds/button";
export const Center = (props: { children: React.ReactNode }) => {
  return (
    <div className=" flex justify-center flex-col items-center min-h-screen">
      <div className=" flex flex-col gap-y-16 justify-center items-center max-w-[400px] w-full">
        {props.children}
      </div>
      <Button variant={"outline"} size={"sm"} onClick={() => toast.dismiss()}>
        toast dismiss
      </Button>
    </div>
  );
};
