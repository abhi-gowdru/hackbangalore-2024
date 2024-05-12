import { Accordion, AccordionItem } from "@nextui-org/react";
import { faqData } from "@/components/LandingPage/faqData";


export default function FAQ() {
    return (
        <div className="container mx-auto max-w-7xl px-6 flex-grow pt-2 w-full">
            <div className="flex flex-row justify-center ">
                <div className="flex flex-col justify-center w-full">
                    <p className="text-center text-2xl md:text-3xl font-bold mb-5">Frequently Asked Questions</p>
                    <div>
                        <Accordion>
                            {faqData.faqItems.map((faqItems, index) => (
                                <AccordionItem key={index} aria-label={`Accordion ${index + 1}`} title={faqItems.question}>
                                    {faqItems.answer}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}
