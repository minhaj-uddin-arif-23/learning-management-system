import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function UserHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Learning Platform</h1>
      <Card>
        <CardHeader>
          <CardTitle>Explore Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Browse our wide range of courses.</p>
          <Link href="/courses" className="text-blue-600 hover:underline">
            View Courses
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}