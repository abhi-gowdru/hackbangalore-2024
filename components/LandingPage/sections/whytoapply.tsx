import { Card, CardBody, Image, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion";


export default function WhyToApply() {
    return (
        <div className="flex flex-col justify-center my-20">
            <div className="text-center">
                <p className="text-2xl font-extrabold md:text-4xl">Why apply for a loan on OpenPe?</p>
                <p className="text-md md:text-lg mt-2 text-slate-500">It’s easy, fast, and flexible</p>
            </div>
            <div className="container mx-auto max-w-7xl px-6 flex-grow pt-2 mt-4">
                <div className="flex flex-col justify-center md:flex-row">
                    <div className="flex flex-row w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            <div className="flex flex-col justify-center">
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] shadow-none">
                                        <CardBody className="overflow-visible py-2">
                                            <div className="flex justify-center">
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl"
                                                    src="https://assets.lazypay.in/web/lazypay/wordpress/prod/EMI-2-1.png?tx=t_web_large"
                                                    width={180}
                                                />
                                            </div>
                                        </CardBody>
                                        <CardFooter className="pb-0 pt-2 px-4 flex-col items-center">
                                            <h4 className="font-bold text-large">Flexible EMI options</h4>
                                            <p className="text-default-500">EMI plans that suit you</p>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            </div>
                            <div className="flex flex-col  justify-center">
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] shadow-none">
                                        <CardBody className="overflow-visible py-2">
                                            <div className="flex justify-center">
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl"
                                                    src="https://assets.lazypay.in/web/lazypay/wordpress/prod/Zero-paper-work-2-1.png?tx=t_web_large"
                                                    width={80}
                                                />
                                            </div>
                                        </CardBody>
                                        <CardFooter className="pb-0 pt-2 px-4 flex-col items-center">
                                            <h4 className="font-bold text-large">Zero paperwork</h4>
                                            <p className="text-default-500">Everything’s online and 100% digital</p>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            </div>
                            <div className="flex flex-col  justify-center">
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] shadow-none">
                                        <CardBody className="overflow-visible py-2 ">
                                            <div className="flex justify-center">
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl"
                                                    src="https://assets.lazypay.in/web/lazypay/wordpress/prod/Super-fast-and-simple-1-1.png?tx=t_web_large"
                                                    width={80}
                                                />
                                            </div>

                                        </CardBody>
                                        <CardFooter className="pb-0 pt-2 px-4 flex-col items-center">
                                            <h4 className="font-bold text-large">Lightning fast approvals</h4>
                                            <p className="text-default-500">Money sent instantly to your account</p>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}