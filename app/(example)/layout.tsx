"use client";
import { Button } from "@xionwcfm/xds/button";
import { Row, Text2Row } from "@xionwcfm/xds/list";
import { Paragraph } from "@xionwcfm/xds/paragraph";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "~/src/routes";
import { toast } from "@xionwcfm/xds/toast";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className=" flex gap-16 flex-col md:flex-row ">
      <Sidebar />
      <div className=" w-full flex flex-col p-16">{props.children}</div>
      <div className=" absolute bottom-[32px] left-[50%] translate-x-[-50%]">
        <Button onClick={() => toast.dismiss()} variant={"outline"} size={"md"}>
          toast dismiss
        </Button>
      </div>
    </div>
  );
}

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className=" py-16 flex flex-col border-b md:border-r border-gray-200">
      {routes.map(({ href, label, description }) => (
        <Link href={href} key={href}>
          <Row highlighted={pathname === href}>
            <Text2Row
              top={
                <Paragraph size={"6"} weight={"light"} color={"gray-800"}>
                  {label}
                </Paragraph>
              }
              bottom={
                <Paragraph
                  overflow={"ellipsis"}
                  size={"4"}
                  weight={"light"}
                  color={"gray-500"}
                >
                  {description}
                </Paragraph>
              }
            />
          </Row>
        </Link>
      ))}
    </div>
  );
};
