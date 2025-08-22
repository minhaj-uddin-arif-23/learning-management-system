"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function UserNavbar() {
  const router = useRouter();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/user/home" className="text-xl font-bold">
          Learning Platform
        </Link>
        <div className="space-x-4">
          <Link href="/user/courses">
            <Button variant="ghost" className="text-white hover:text-gray-200">
              Courses
            </Button>
          </Link>
          <Link href="/user/my-courses">
            <Button variant="ghost" className="text-white hover:text-gray-200">
              My Courses
            </Button>
          </Link>
          <Link href="/user/progress">
            <Button variant="ghost" className="text-white hover:text-gray-200">
              Progress
            </Button>
          </Link>
          <Link href="/user/profile">
            <Button variant="ghost" className="text-white hover:text-gray-200">
              Profile
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-white hover:text-gray-200"
            onClick={() => router.push('/logout')}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}