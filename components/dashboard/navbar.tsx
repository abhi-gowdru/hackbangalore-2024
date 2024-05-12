import { useEffect, useState } from 'react';
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenuToggle,
    NavbarBrand,
} from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";

import NextLink from "next/link";


import { auth, db } from '@/backend/db_config';
import { doc, getDoc } from 'firebase/firestore';

export const DashNavbar = () => {
    const [userData, setUserData] = useState({});

    // Fetch user data from Firestore
    const fetchUserData = async (email) => {
        const userDocRef = doc(db, "users", email);
        try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setUserData(userDoc.data());
            } else {
                console.log("No user data found in Firestore!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Fetch user data when the component mounts or when the user signs in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, fetch user data
                fetchUserData(user.email);
            } else {
                // No user is signed in
                setUserData({});
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <NextUINavbar maxWidth="xl" position="sticky" isBordered>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold font-serif text-inherit text-lg">OpenPe</p>
                    </NextLink>
                </NavbarBrand>

            </NavbarContent>

            <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
                <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                        <User
                            as="button"
                            avatarProps={{
                                isBordered: true,
                                src: userData.photoURL,
                            }}
                            className="transition-transform"
                            description={userData.email}
                            name={userData.displayName}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-bold">Signed in as</p>
                            <p className="font-bold">{userData.email}</p>
                        </DropdownItem>
                        <DropdownItem key="settings">
                            Loan history
                        </DropdownItem>
                        <DropdownItem key="team_settings">Choose language</DropdownItem>
                        <DropdownItem key="analytics">
                            Insurance
                        </DropdownItem>
                        <DropdownItem key="system">Help and Support</DropdownItem>
                        <DropdownItem key="configurations">Refer and Earn</DropdownItem>
                        <DropdownItem key="help_and_feedback">
                            Privacy Policy
                        </DropdownItem>
                        <DropdownItem key="help_and_feedback">
                            Terms and conditions
                        </DropdownItem>
                        <DropdownItem key="help_and_feedback">
                            About
                        </DropdownItem>
                        <DropdownItem key="help_and_feedback">
                            Settings
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarMenuToggle className="sm:hidden basis-1 pl-4" />
            </NavbarContent>
        </NextUINavbar>
    );
};
