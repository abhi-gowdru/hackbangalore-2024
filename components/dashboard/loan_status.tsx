import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { auth, db } from '@/backend/db_config';
import { doc, getDoc } from 'firebase/firestore';

export default function LoanStatus() {
    const [userData, setUserData] = useState({});

    // Fetch user data from Firestore
    const fetchUserData = async (email) => {
        const userDocRef = doc(db, "loans_applied", email);
        try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setUserData(userDoc.data());
            } else {
                console.log("No user data found");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
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
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:py-16 lg:px-6">
                <div className="font-light sm:text-lg">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold">We didn&apos;t reinvent the wheel</h2>
                    <p className="mb-4">We are strategists, designers, and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
                    <p>We are strategists, designers, and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                    <Card className="w-full rounded-lg">
                        <CardBody>
                            <p>Application Status: {userData.loan_status}</p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
