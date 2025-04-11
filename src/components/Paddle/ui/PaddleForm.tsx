"use client";

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useRef } from "react";

function PaddleForm() {
  const paddleRef = useRef<Paddle>(null);
  useEffect(() => {
   
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_CLIENT_TOKEN,
      debug: true,
    }).then((instance) => {
      if (instance) {
        paddleRef.current = instance;
        instance.Checkout.open({
          items: [{ priceId: "pri_01jrff3wvrg0k3rde8gkbnm8v2", quantity: 1 }],

         
        });
      } else {
        console.error("paddle instance is:", instance);
      }
    });
  }, []);
  return <div>PaddleForm</div>;
}

export default PaddleForm;
