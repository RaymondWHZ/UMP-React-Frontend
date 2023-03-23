import { Box, Container, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";

// const ListHeader = ({ children }: { children: ReactNode }) => {
//   return (
//     <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
//       {children}
//     </Text>
//   );
// };
//
// export type FooterProps = {
//   items: NavItem[];
// }

export function Footer() {
  return (
    <Box
      bg="#13253F"
      color="white"
      borderTop={1}
      borderStyle={'solid'}
      borderColor="gray.600"
      pb="30px"
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
            </Box>
            <Text fontSize={'sm'}>
              2022 © Copyrights Ultra-Music-Practice.com
            </Text>
          </Stack>
          {/*{items.map(item => (*/}
          {/*  <Stack key={item.label} align={'flex-start'}>*/}
          {/*    <ListHeader>{item.label}</ListHeader>*/}
          {/*    {item.children?.map(child => (*/}
          {/*      <SiteLink key={child.label} href={child.href}>{child.label}</SiteLink>*/}
          {/*    ))}*/}
          {/*  </Stack>*/}
          {/*))}*/}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
