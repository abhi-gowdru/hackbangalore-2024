import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/default";
import NextLink from "next/link";



import { Button, Input, Card, CardBody, Image } from "@nextui-org/react";
import {
    EyeFilledIcon, EyeSlashFilledIcon
} from "@/components/icons";
import { Divider } from "@nextui-org/divider";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '@/backend/db_config';
import {
    GoogleIcon
} from "@/components/icons";

import { doc, setDoc } from 'firebase/firestore';

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setconfPassword] = useState('');

    const [isVisible, setIsVisible] = useState(false);
    const [isconfVisible, setIsVisibleconf] = useState(false);

    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const router = useRouter();

    const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const validatePassword = (password) => password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

    const isEmailInvalid = useMemo(() => {
        if (!isEmailTouched || email === "") return false;
        return validateEmail(email) ? false : true;
    }, [email, isEmailTouched]);

    const isPasswordInvalid = useMemo(() => {
        if (!isPasswordTouched || password === "") return false;
        return validatePassword(password) ? false : true;
    }, [password, isPasswordTouched]);

    const isConfirmPasswordInvalid = useMemo(() => {
        if (!isConfirmPasswordTouched || confpassword === "") return false;
        return confpassword === "" || confpassword !== password;
    }, [confpassword, password, isConfirmPasswordTouched]);



    const handleLogIn = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            if (email === "" || password === "" || confpassword === "") {
                setError('Email and password are required');
                setIsLoading(false);
                return;
            }

            if (!validateEmail(email)) {
                setError('Please enter a valid email');
                setIsLoading(false);
                return;
            }

            if (!validatePassword(password)) {
                setError("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character");
                setIsLoading(false);
                return;
            }

            if (password !== confpassword) {
                setError("Passwords do not match");
                setIsLoading(false);
                return;
            }

            const authresp = await createUserWithEmailAndPassword(auth, email, confpassword);

            if (authresp) {
                console.log(authresp.user.email);
                setIsLoading(false);
                router.replace("/dashboard");
            }
            // Redirect or do something after successful sign-up
        } catch (error) {
            const errorCode = error.code;
            setError(errorCode);
            setIsLoading(false);
        }
    };

    const continueGoogle = async () => {
        setIsGoogleLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const googlesignin = await signInWithPopup(auth, provider);
            if (googlesignin) {
                storeUserInfo(googlesignin.user);
                setIsGoogleLoading(false);
                router.replace("/dashboard");
            }
        } catch (error) {
            const errorCode = error.code;
            setError(errorCode);
            setIsGoogleLoading(false);
        }
    }

    const storeUserInfo = async (user) => {
        const userRef = doc(db, "users", user.email); // Create a document with UID as the document ID
        try {
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || 'Anonymous',
                photoURL: user.photoURL,
                lastLogin: new Date() // Store the last login time
            }, { merge: true }); // Use merge to avoid overwriting existing fields
        } catch (error) {
            setError(error.code);
        }
    };

    const closeAlert = () => {
        setError("");
    };

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityConf = () => setIsVisibleconf(!isconfVisible);


    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4">
                <div className="inline-block max-w-lg text-center justify-center">
                    <div className="flex flex-col justify-center my-4">
                        <div className="flex justify-center">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                        </div>

                        <p>Welcome</p>
                        <p>Create your account to get started</p>
                    </div>

                    <Card className="min-w-[360px] max-w-[380px] p-4">
                        <CardBody>
                            {error && (
                                <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div className="ms-3 text-sm font-medium">
                                        {error}
                                    </div>
                                    <button type="button" onClick={closeAlert} className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
                                        <span className="sr-only">Close</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            <div>
                                <form onSubmit={handleLogIn}>
                                    <Input
                                        radius="lg"
                                        type="email"
                                        label="Email Address"
                                        className="max-w-xs my-3"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        variant="bordered"
                                        isInvalid={isEmailInvalid}
                                        color={isEmailInvalid ? "danger" : "default"}
                                        errorMessage={isEmailInvalid && "Please enter a valid email"}
                                        onBlur={() => setIsEmailTouched(true)}
                                        placeholder="Enter your email"
                                    />
                                    <Input
                                        label="Password"
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                        className="max-w-xs my-1"
                                        isInvalid={isPasswordInvalid}
                                        color={isPasswordInvalid ? "danger" : "default"}
                                        errorMessage={isPasswordInvalid && "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={() => setIsPasswordTouched(true)}
                                        value={password}
                                        variant="bordered"
                                        placeholder="Enter your password"

                                    />
                                    <Input
                                        label="Confirm Password"
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibilityConf}>
                                                {isconfVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isconfVisible ? "text" : "password"}
                                        className="max-w-xs my-3 w-full"
                                        onChange={(e) => setconfPassword(e.target.value)}
                                        value={confpassword}
                                        variant="bordered"
                                        isInvalid={isConfirmPasswordInvalid}
                                        color={isConfirmPasswordInvalid ? "danger" : "default"}
                                        errorMessage={isConfirmPasswordInvalid && "Passwords do not match"}
                                        onBlur={() => setIsConfirmPasswordTouched(true)}
                                        placeholder="Enter your confirm password"
                                    />
                                    <div className="text-center text-xs">
                                        By clicking Agree & Join, you agree to the our User Agreement, Privacy Policy, and Cookie Policy.
                                    </div>

                                    <Button type="submit" color="primary" radius="md" className="my-3 w-full" isDisabled={!(email && password && confpassword && !isEmailInvalid && !isPasswordInvalid && !isConfirmPasswordInvalid)} isLoading={isLoading}>
                                        Agree and Join
                                    </Button>


                                </form>
                            </div>
                            <Divider className="my-4" />
                            <div className="grid gap-4 grid-cols-1">
                                <Button color="default" variant="ghost" onClick={continueGoogle} isLoading={isGoogleLoading}>
                                    <GoogleIcon /> Continue with Google
                                </Button>
                            </div>
                            <div className="flex justify-center text-sm mt-4">
                                Already on NewApp? &nbsp; <NextLink
                                    href="/login"
                                ><span className="text-blue-600 hover:text-blue-400 transition delay-300 duration-300 ease-in-out">Sign in</span></NextLink>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </section>
        </DefaultLayout>
    );
}
