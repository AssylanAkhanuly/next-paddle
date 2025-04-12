import { LogoutButton } from "@/components/logout-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@prisma/client";


const Welcome = ({ user }: { user: User }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-medium">Welcome, {user.name}!</h2>
          <p className="text-slate-600">You are logged in as {user.email}</p>
        </div>
        <LogoutButton />
      </CardContent>
    </Card>
  );
};

export default Welcome;
