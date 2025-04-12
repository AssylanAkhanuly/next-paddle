"use server";

import { paddle } from "@/lib/paddle";

export const getTransactions = paddle.transactions.list;
