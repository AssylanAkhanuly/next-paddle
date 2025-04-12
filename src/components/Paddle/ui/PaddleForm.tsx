"use client";

import { Button } from "@/components/button";
import { Modal } from "@/components/ui/modal";
import { initializePaddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

function PaddleForm() {
  const initialize = () => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
      debug: true,
    }).then((instance) => {
      if (instance) {
        instance.Checkout.open({
          settings: {
            displayMode: "inline",
            frameTarget: "checkout-container",
            frameInitialHeight: 632,
            frameStyle:
              "width: 100%; background: transparent; border: none; min-height: 300px",
          },
          items: [
            {
              priceId: "pri_01jrjy81mw2hnvz9xf6h8qwvjy",
              quantity: 1,
            },
          ],
        });
      } else {
        console.warn("instance is not initialized:", instance);
      }
    });
  };

  useEffect(() => {
    initialize();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal title="Modal" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="checkout-container"></div>
      </Modal>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
    </>
  );
}

export default PaddleForm;
