"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCourses } from '@/lib/api';
import { Course } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

export default function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      const courses = await getCourses();
      const course = courses.find((c) => c._id === courseId);
      setCourse(course || null);
    }
    fetchCourse();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Image  src={`/uploads/${course.thumbnail}`} alt={course.title} width={200} height={150} className="w-full h-60 object-cover mb-4" />
          <p className="text-gray-600 mb-2">{course.description}</p>
          <p className="font-bold mb-4">${course.price}</p>
          <Link href={`/courses/${courseId}/lectures`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Go to Lectures</button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Static review content goes here.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Instructor Info</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Static instructor info goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}