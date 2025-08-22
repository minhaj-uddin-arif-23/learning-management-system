"use client"
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Course } from '@/lib/types';
import { deleteCourse } from '@/lib/api';
import Image from 'next/image';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this course?')) {
      await deleteCourse(course._id);
      window.location.reload();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={`/uploads/${course.thumbnail}`} width={200} height={150}  alt={course.title} className="w-full h-40 object-cover mb-4" />
        <p className="text-gray-600 mb-2">{course.description}</p>
        <p className="font-bold mb-4">${course.price}</p>
        <div className="flex space-x-2">
          <Link href={`/admin/courses/${course._id}/modules`}>
            <Button variant="outline">Manage Modules</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}