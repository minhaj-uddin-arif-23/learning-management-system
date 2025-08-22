"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (!session) return null;

  const isAdmin = session.user.role === "admin";

  return (
    <nav className={`p-4 ${isAdmin ? "bg-gray-800" : "bg-blue-600"} text-white`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href={isAdmin ? "/admin/dashboard" : "/user/home"}
          className="text-xl font-bold"
        >
          {isAdmin ? "Admin Dashboard" : "Learning Platform"}
        </Link>
        <div className="space-x-4">
          {isAdmin ? (
            <>
              <Link href="/courses">
                <Button
                  variant="ghost"
                  className={`text-white hover:text-gray-300 ${
                    pathname === "/courses" ? "font-bold" : ""
                  }`}
                >
                  Courses
                </Button>
              </Link>
              <Link href="/lectures">
                <Button
                  variant="ghost"
                  className={`text-white hover:text-gray-300 ${
                    pathname === "/admin/lectures" ? "font-bold" : ""
                  }`}
                >
                  Lecture Management
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  variant="ghost"
                  className={`text-white hover:text-gray-300 ${
                    pathname === "/admin/profile" ? "font-bold" : ""
                  }`}
                >
                  Profile
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/user/courses">
                <Button
                  variant="ghost"
                  className={`text-white hover:text-gray-200 ${
                    pathname === "/courses" ? "font-bold" : ""
                  }`}
                >
                  Courses
                </Button>
              </Link>
              <Link href="/my-courses">
                <Button
                  variant="ghost"
                  className={`text-white hover:text-gray-200 ${
                    pathname === "/user/my-courses" ? "font-bold" : ""
                  }`}
                >
                  My Courses
                </Button>
              </Link>
              <Link href="/progress">
                <Button
                  variant="ghost"
                  className={`text-white hover:text-gray-200 ${
                    pathname === "/user/progress" ? "font-bold" : ""
                  }`}
                >
                  Progress
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  variant="ghost"
                  className={`text-white hover:text-gray-200 ${
                    pathname === "/user/profile" ? "font-bold" : ""
                  }`}
                >
                  Profile
                </Button>
              </Link>
            </>
          )}
          <Button
            variant="ghost"
            className={`text-white hover:${isAdmin ? "text-gray-300" : "text-gray-200"}`}
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}