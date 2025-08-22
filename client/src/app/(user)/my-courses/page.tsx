"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCourses } from '@/lib/api';
import { Course } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      const data = await getCourses(); 
      setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Link key={course._id} href={`/user/courses/${course._id}/lectures`}>
            <Card>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src={`/uploads/${course.thumbnail}`} width={200} height={150} alt={course.title} className="w-full h-40 object-cover mb-4" />
                <p className="text-gray-600">{course.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}