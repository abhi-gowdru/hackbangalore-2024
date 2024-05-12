import { useEffect, useState } from 'react';
import withAuth from "@/backend/withAuth";
import { DashNavbar } from "@/components/dashboard/navbar";
import { auth } from '@/backend/db_config';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { sendEmailVerification } from 'firebase/auth';
import Loan_Status from '@/components/dashboard/loan_status';
import sideBar from '@/components/dashboard/sidebar';

function HomePage() {

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified === false) {
          onOpen();
        }
        setIsEmailVerified(user.emailVerified);
      }
    });

    return () => unsubscribe();
  }, []);

  const resendVerificationEmail = () => {
    const user = auth.currentUser;
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          console.log("Verification email sent successfully");
          // Optionally, you can display a message indicating that the email has been sent.
        })
        .catch(error => {
          console.error("Error sending verification email:", error);
        });
    }
  };

  return (
    <div>
      <DashNavbar />
      <div>
        {isEmailVerified ? (
          <p></p>
        ) : (
          <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-center">Verify Your email address</ModalHeader>
                  <ModalBody>
                    <div className='flex flex-col text-center justify-center'>
                      <p>
                        You&apos;re almost there! We sent an email to
                      </p>
                      <p className='mt-4'>
                        just click on the link in that email to complete your signup. if you don&apos;t see it, you may need to check your spam folder.
                      </p><p className='mt-4'>
                        Still can&apos;t find the email? No problem
                      </p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={resendVerificationEmail} className='w-full'>
                      Resent Verification Email
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>)}
      </div>
      <div className='container mx-auto max-w-7xl px-6 flex-grow mt-4'>
        <Loan_Status></Loan_Status>
      </div>
    </div>
  );
}

export default withAuth(HomePage);