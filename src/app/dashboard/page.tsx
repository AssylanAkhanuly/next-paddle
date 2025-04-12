import { PaddleForm } from "@/components/Paddle/ui";
import Transactions from "@/components/Paddle/ui/Transactions";
import Welcome from "@/components/Welcome/Welcome";
import { getUserFromToken } from "@/lib/auth-actions";
import { paddle } from "@/lib/paddle";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUserFromToken();

  if (!user) {
    return redirect("/login");
  }
  const customer  = await paddle.customers.get()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <PaddleForm />
      <Transactions />
      <Welcome user={user} />
    </div>
  );
}
