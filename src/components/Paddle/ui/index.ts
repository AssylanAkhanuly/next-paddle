"use client"
import dynamic from "next/dynamic";

export const PaddleForm = dynamic(() => import("./PaddleForm"), { ssr: false });
