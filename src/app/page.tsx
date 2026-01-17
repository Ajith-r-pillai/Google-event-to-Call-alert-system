
"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Calendar Call Reminder</CardTitle>
          <CardDescription className="text-base mt-2">
            Login with Google to get phone call reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error === "login_required" && (
            <Alert variant="destructive">
              <AlertDescription>
                Please login to access the dashboard
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full"
            size="lg"
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}