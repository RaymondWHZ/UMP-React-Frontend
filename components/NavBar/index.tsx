import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Button, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, Avatar, Spacer, HStack, Center,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {SiteLink} from "@/components/SiteLink";
import React from "react";
import Script from "next/script";
import {useUserInfo} from "@/services/user";
import styles from "./navbar.module.css";
import Image from "next/image";

export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export type NavBarProps = {
  title: string;
  items: NavItem[];
  opacity?: number;
  height: any;
  rightButton?: {
    text?: string;
    props?: React.ComponentProps<typeof Button>;
  }
}

function LoginAvatar() {
  const { data: userData, loading } = useUserInfo()

  if (loading) {
    return <></>
  }

  if (!userData.email) {
    return (
      <>
        <Script src="https://accounts.google.com/gsi/client" async defer></Script>
        <Script
          id="script1"
          dangerouslySetInnerHTML={{
            __html: `
            function handleToken(response) {
              console.log(response)
              localStorage.setItem("gis-token", response.credential)
              location.reload()
            }
          `,
          }}
        />
        <div id="g_id_onload"
             data-client_id="377209871944-4e19f4e5aadmgnekii6j9c15v1sucnf0.apps.googleusercontent.com"
             data-callback="handleToken"
             data-auto_prompt="true"
             data-nonce="n3ch7e9q8tf850c5goijd32"
        />
        <div className="g_id_signin"
             data-type="standard"
             data-size="large"
             data-theme="outline"
             data-text="sign_in_with"
             data-shape="rectangular"
             data-logo_alignment="left"
        />
      </>
    )
  }

  return (
    <Menu >
      <MenuButton as={Avatar} colorScheme='pink' size='sm' src={userData.picture} showBorder />
      <MenuList color="gray.600">
        <MenuItem closeOnSelect={false}>{userData.email}</MenuItem>
        <MenuDivider />
        <MenuGroup title='Subscription'>
          { userData["Expired"] == "True" ?
            <MenuItem closeOnSelect={false}>Subscription expired</MenuItem> :
            <MenuItem closeOnSelect={false}>Valid until: { userData["End Date"] }</MenuItem>
          }
        </MenuGroup>
        <MenuDivider />
        <MenuItem
          onClick={async () => {
            localStorage.removeItem('api-token');
            location.replace('/');
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export function NavBar({ title, items, height }: NavBarProps) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      justify="center"
      position={"fixed"}
      width={'100%'}
      zIndex={1000}
      top={0}
      bg="#13253F"
      color="white"
      h={height}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor="gray.600"
    >
      <Flex
        flex={1}
        h={height}
        align={'center'}
        pl={30}
        pr={30}
      >
        <Flex  // menu bar in mobile mode
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        <Spacer display={{ base: 'flex', md: 'none' }}/>

        <HStack>
          <Center ml="-8px" mr="-6px">
            <Image alt="" src="/icon.png" width="38px" height="38px"/>
          </Center>
          <SiteLink
            className={styles.siteTitle}
            href={'/'}
          >
            <b>{title}</b>
          </SiteLink>
        </HStack>

        <Spacer />

        <Flex
            display={{ base: 'none', md: 'flex' }}
            flex={{ base: 1 }}
            justify={{ base: 'center', md: 'end' }}
            mr={30}
        >
          <DesktopNav items={items} />
        </Flex>

        <LoginAvatar/>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav items={items} />
      </Collapse>
    </Flex>
  );
}

const DesktopNav = ({ items }: { items: NavItem[] }) => {
  const linkColor = "white";
  const linkHoverColor = "gray.400";
  const popoverContentBgColor = "#13253F";

  return (
    <Stack direction={'row'} spacing={4}>
      {items.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <SiteLink
                p={2}
                href={navItem.href}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'underline',
                  color: linkHoverColor,
                }}
                fontFamily={'Inder'}
              >
                {navItem.label}
              </SiteLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <SiteLink
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'blue.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </SiteLink>
  );
};

const MobileNav = ({ items }: { items: NavItem[] }) => {
  return (
    <Stack
      bg="#13253F"
      p={4}
      display={{ md: 'none' }}>
      {items.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={SiteLink}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color="white"
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
          children.map((child) => (
            <SiteLink key={child.label} py={2} href={child.href}>
              {child.label}
            </SiteLink>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
