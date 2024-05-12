import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Input, Checkbox, Image, Button } from "@nextui-org/react";
import { useState, useMemo } from "react";
import { db } from '@/backend/db_config';
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore modules from Firebase Modular SDK
export default function MainBanner() {
    const [error, setError] = useState('');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        gstNumber: '',
        receiveUpdates: false,
        agreeterms: false,
        loan_status: 'pending'
    });

    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const validateMob = (value) => /^\d{10}$/.test(value);
    const validateGSTIN = (value) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(value);

    const isInvalidEmail = useMemo(() => {
        if (formData.email === "") return false;

        return validateEmail(formData.email) ? false : true;
    }, [formData.email]);

    const isInvalidMob = useMemo(() => {
        if (formData.mobileNumber === "") return false;

        return validateMob(formData.mobileNumber) ? false : true;
    }, [formData.mobileNumber]);

    const isInvalidGST = useMemo(() => {
        if (formData.gstNumber === "") return false;

        return validateGSTIN(formData.gstNumber) ? false : true;
    }, [formData.gstNumber]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData(prevData => ({
            ...prevData,
            [name]: val
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const { firstName, lastName, email, mobileNumber, gstNumber } = formData;
        if (!firstName || !lastName || !email || !mobileNumber || !gstNumber) {
            setError("Please fill out all required fields");
            return;
        }

        try {
            const userRef = doc(db, 'loans_applied', email); // Reference with specific document ID
            await setDoc(userRef, formData); // Set document data
            // Reset form data after successful submission
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                mobileNumber: '',
                gstNumber: '',
                receiveUpdates: false,
                agreeterms: false,
                loan_status: ''
            });

            // Optionally, you can show a success message here
            alert('Form submitted successfully!');
        } catch (error) {
            setError("Oops.. Something went wrong Please Try Again Later");
        }
    };


    const closeAlert = () => {
        setError("");
    };

    return (
        <div className="container mx-auto max-w-7xl px-6 flex-grow pt-2">
            <div className="flex flex-col-reverse justify-center md:flex-row">
                <div className="flex flex-col justify-center basis-1/2">
                    <p className="text-1xl font-bold mb-2 md:mb-5 md:text-3xl">Accelerate business growth with OpenPe Business Loans</p>
                    <p className="text-xs md:text-lg font-semibold mb-3">Loan solution by India&#39;s largest fintech platform</p>
                    <ul className="list-disc ms-6 md:ms-14 font-light mt-2 text-xs md:text-base">
                        <li>Enjoy industry-best success rates and uncompromised security</li>
                        <li>Enjoy flexible loan tenures from 3 months to 60 months; choose a plan you like!</li>
                        <li>Our credit model generates the best personalized offer for you</li>
                    </ul>
                    <div className="mt-8">
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button color="primary" className="w-full md:w-56" onPress={onOpen}>
                                Get Your Loan
                            </Button>
                            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1">
                                                <p className="text-2xl">
                                                    Get up to ₹10 lakhs
                                                    in 10 mins!</p>
                                                <p className="text-[18px]">Business loans made just for you</p></ModalHeader>
                                            <ModalBody>
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
                                                <form onSubmit={handleSubmit} autoComplete="off">
                                                    <div className="gap-2 grid grid-cols-2">
                                                        <div className="mb-3">
                                                            <Input
                                                                type="text"
                                                                name="firstName"
                                                                value={formData.firstName}
                                                                onChange={handleChange}
                                                                placeholder="First Name"
                                                                required
                                                                variant="bordered"
                                                                size="lg"
                                                            />
                                                        </div >
                                                        <div className="mb-3">
                                                            <Input
                                                                type="text"
                                                                name="lastName"
                                                                value={formData.lastName}
                                                                onChange={handleChange}
                                                                placeholder="Last Name"
                                                                variant="bordered"
                                                                required
                                                                size="lg"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            placeholder="Email"
                                                            description="We'll never share your email with anyone else."
                                                            variant="bordered"
                                                            required
                                                            size="lg"
                                                            isInvalid={isInvalidEmail}
                                                            color={isInvalidEmail ? "danger" : "default"}
                                                            errorMessage={isInvalidEmail && "Please enter a valid email"}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <Input
                                                            type="text"
                                                            name="mobileNumber"
                                                            value={formData.mobileNumber}
                                                            onChange={handleChange}
                                                            placeholder="Mobile Number"
                                                            variant="bordered"
                                                            required
                                                            size="lg"
                                                            isInvalid={isInvalidMob}
                                                            color={isInvalidMob ? "danger" : "default"}
                                                            errorMessage={isInvalidMob && "Please enter a valid 10 digit Mobile Number"}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <Input
                                                            type="text"
                                                            name="gstNumber"
                                                            value={formData.gstNumber}
                                                            onChange={handleChange}
                                                            placeholder="GST Number"
                                                            variant="bordered"
                                                            required
                                                            size="lg"
                                                            isInvalid={isInvalidGST}
                                                            color={isInvalidGST ? "danger" : "default"}
                                                            errorMessage={isInvalidGST && "Please enter a valid GST Number"}
                                                            description="GST Number Example : 12ABCDE1234F1Z5"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="text-xs">
                                                            <Checkbox
                                                                type="checkbox"
                                                                name="receiveUpdates"
                                                                checked={formData.agreeterms}
                                                                onChange={handleChange}
                                                                size="sm"
                                                            />
                                                            By proceeding, you agree to our Terms & Conditions  &  Privacy Policy
                                                        </label>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="text-xs">
                                                            <Checkbox
                                                                type="checkbox"
                                                                name="receiveUpdates"
                                                                checked={formData.receiveUpdates}
                                                                onChange={handleChange}
                                                                size="sm"
                                                            />
                                                            Get loan updates on Whatsapp
                                                        </label>
                                                    </div>

                                                    <Button type="submit" className="w-full bg-green-600 my-2" isDisabled={!(formData.email && formData.firstName && formData.lastName && formData.gstNumber && formData.mobileNumber)}>
                                                        Apply Now
                                                    </Button>
                                                    <Button color="danger" variant="light" onPress={onClose} className="w-full my-2">
                                                        Close
                                                    </Button>
                                                </form>
                                            </ModalBody>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                            <Button color="primary" variant="light" className="w-full md:w-56">
                                Find out more
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="basis-1/2 mb-3 md:mb-0">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/main_screen_img.png"
                    /></div>
            </div>
        </div>
    );
}