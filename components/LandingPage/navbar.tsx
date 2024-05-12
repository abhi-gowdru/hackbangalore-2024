import {
	Button,
	Link,
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/react";

import { link as linkStyles } from "@nextui-org/theme";

import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";


export const Navbar = () => {
	return (
		<NextUINavbar maxWidth="xl" position="sticky" isBordered>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold font-serif text-inherit text-lg">OpenPe</p>
					</NextLink>
				</NavbarBrand>

			</NavbarContent>

			<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">

				<div className="hidden lg:flex gap-4 justify-end ml-2">
					{siteConfig.navItems.map((item) => (
						<motion.div whileHover={{ scale: 1.08 }} key={item.href}>
							<NavbarItem>
								<NextLink
									className={clsx(
										linkStyles({ color: "foreground" }),
										"data-[active=true]:text-primary data-[active=true]:font-medium"
									)}
									color="foreground"
									href={item.href}
								>
									{item.label}
								</NextLink>
							</NavbarItem>
						</motion.div>
					))}
				</div>
				<NextLink
					href="/register"
				>
					<Button color="primary" variant="flat">
						Join Now
					</Button>
				</NextLink>
				<NextLink
					href="/login"
				>
					<Button color="primary" variant="solid">
						Log In
					</Button>
				</NextLink>
				<NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<NextLink
								color="primary"
								href={item.href}
								size="lg"
							>
								{item.label}
							</NextLink>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
