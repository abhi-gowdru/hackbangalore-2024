import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/default";


import { Button, Input, Card, CardBody, Checkbox, Image } from "@nextui-org/react";
// import {
//     EyeFilledIcon, EyeSlashFilledIcon
// } from "@/components/icons";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import auth from '@/backend/db_config';
import {
    GoogleIcon, FacebookIcon
} from "@/components/icons";

export default function LogIn() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    // const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [error, setError] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isFbLoading, setIsFbLoading] = useState(false);

    const router = useRouter();

    // const validateEmail = (email) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    // const isEmailInvalid = useMemo(() => {
    //     if (!isEmailTouched || email === "") return false;
    //     return validateEmail(email) ? false : true;
    // }, [email, isEmailTouched]);


    // const handleLogIn = async (e) => {
    //     setIsLoading(true);
    //     e.preventDefault();
    //     try {
    //         if (email === "" || password === "") {
    //             setError('Email and password are required');
    //             setIsLoading(false);
    //             return;
    //         }
    //         if (!validateEmail(email)) {
    //             setError('Please enter a valid email');
    //             setIsLoading(false);
    //             return;
    //         }

    //         const authresp = await signInWithEmailAndPassword(auth, email, password);

    //         if (authresp) {
    //             console.log(authresp.user.email);
    //             setIsLoading(false);
    //             router.replace("/dashboard");
    //         }
    //         // Redirect or do something after successful sign-up
    //     } catch (error) {
    //         const errorCode = error.code;
    //         setError(errorCode);
    //         setIsLoading(false);
    //     }
    // };

    const continueGoogle = async () => {
        setIsGoogleLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const googlesignin = await signInWithPopup(auth, provider);
            if (googlesignin) {
                console.log(googlesignin);
                setIsGoogleLoading(false);
                router.replace("/dashboard");
            }
        } catch (error) {
            const errorCode = error.code;
            setError(errorCode);
            setIsGoogleLoading(false);
        }
    }

    const continueFacebook = async () => {
        setIsFbLoading(true);
        try {
            const provider = new FacebookAuthProvider();
            const fbsignin = await signInWithPopup(auth, provider)
            if (fbsignin) {
                console.log(fbsignin);
                setIsFbLoading(false);
                router.replace("/dashboard");
            }
        } catch (error) {
            const errorCode = error.code;
            setError(errorCode);
            setIsFbLoading(false);
        }
    }

    const closeAlert = () => {
        setError("");
    };

    // const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-4">
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

                        <p>Welcome Back</p>
                        <p>Log in to your account to continue</p>
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
                            {/* <div>
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
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        variant="bordered"
                                        placeholder="Enter your password"

                                    />
                                    <div className="flex justify-between ...">
                                        <div><Checkbox size="sm" className="my-1">Remember me</Checkbox></div>
                                        <div><p className="text-sm hover:text-slate-400 my-3">Forgot password?</p></div>
                                    </div>

                                    <Button type="submit" color="primary" radius="md" className="my-3 w-full" isDisabled={!(email && password && !isEmailInvalid)} isLoading={isLoading}>
                                        Log In
                                    </Button>


                                </form>
                            </div>
                            <Divider className="my-4" /> */}
                            <div className="grid gap-4 grid-cols-1">
                                <Button color="default" variant="ghost" onClick={continueGoogle} isLoading={isGoogleLoading}>
                                    <GoogleIcon /> Continue with Google
                                </Button>
                                <Button color="default" variant="ghost" onClick={continueFacebook} isLoading={isFbLoading}>
                                    <FacebookIcon /> Continue with Facebook
                                </Button>
                            </div>
                            {/* <div className="flex justify-center text-sm mt-4">
                                Need to create an account?  &nbsp; <span className="text-sky-500 hover:text-sky-400">Sign Up</span>
                            </div> */}
                        </CardBody>
                    </Card>
                </div>
            </section>
        </DefaultLayout>
    );
}
