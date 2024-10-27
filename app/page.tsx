import { ChevronRightIcon } from "@radix-ui/react-icons";
import { List, Row, Text2Row } from "@xionwcfm/xds/list";
import { Paragraph } from "@xionwcfm/xds/paragraph";
import { Stack } from "@xionwcfm/xds/stack";
import Link from "next/link";
import { routes } from "~/src/routes";

const CardRow = (props: { top?: string; bottom?: string }) => {
  return (
    <Row right={<ChevronRightIcon className=" text-gray-400" />}>
      <Text2Row
        top={
          <Paragraph size={"6"} color={"gray-800"} weight={"semi-bold"}>
            {props.top}
          </Paragraph>
        }
        bottom={
          <Paragraph size={"4"} color={"gray-500"} weight={"light"}>
            {props.bottom}
          </Paragraph>
        }
      />
    </Row>
  );
};

export default function Home() {
  return (
    <Stack justify={"center"} items={"center"} minH={"screen"}>
      <List className=" border border-gray-200 rounded-sm md:max-w-[700px] w-full">
        {routes.map((route) => (
          <Link href={route.href} key={route.href} aria-label={route.label}>
            <CardRow top={route.label} bottom={route.description} />
          </Link>
        ))}
      </List>
    </Stack>
  );
}
