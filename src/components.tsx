import { Button } from "@xionwcfm/xds/button";

export const Dialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    isOpen && (
      <div className=" z-10 flex flex-col justify-between border border-gray-200 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-16 rounded-md min-w-[300px] min-h-[300px]">
        <h2>dialog</h2>
        <Button variant={"secondary"} size={"full"} onClick={onClose}>
          close
        </Button>
      </div>
    )
  );
};
