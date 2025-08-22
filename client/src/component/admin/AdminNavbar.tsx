"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AdminNavbar() {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/admin/dashboard" className="text-xl font-bold">
          Admin Dashboard
        </Link>
        <div className="space-x-4">
          <Link href="/admin/courses">
            <Button variant="ghost" className="text-white hover:text-gray-300">
              Courses
            </Button>
          </Link>
          <Link href="/admin/lectures">
            <Button variant="ghost" className="text-white hover:text-gray-300">
              Lecture Management
            </Button>
          </Link>
          <Link href="/admin/profile">
            <Button variant="ghost" className="text-white hover:text-gray-300">
              Profile
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300"
            onClick={() => router.push('/logout')}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}