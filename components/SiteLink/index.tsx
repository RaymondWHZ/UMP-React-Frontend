import React from "react";
import {Button, Link} from "@chakra-ui/react";
import NextLink from "next/link";

export const SiteLink: React.FC<
  React.ComponentProps<typeof Link>
> = (props) => {
  return (
    <NextLink href={props.href ?? '#'} passHref>
      <Link {...{...props, href: undefined}} />
    </NextLink>
  );
};

export const SiteLinkButton: React.FC<
  React.ComponentProps<typeof Button>
  > = (props) => {
  return (
    <NextLink href={props.href ?? '#'} passHref>
      <Button as="a" {...{...props, href: undefined }} />
    </NextLink>
  );
};
