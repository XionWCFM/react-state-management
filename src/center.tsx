export const Center = (props: { children: React.ReactNode }) => {
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <div className=" flex flex-col gap-y-16 justify-center items-center max-w-[400px] w-full">
        {props.children}
      </div>
    </div>
  );
};
