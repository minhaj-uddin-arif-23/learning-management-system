"use client"
import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CourseForm from '../../../component/admin/CourseForm';
import CourseCard from '../../../component/admin/CourseCard';
import { getCourses } from '../../../lib/api';
import { Course } from '../../../lib/types';

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      const data = await getCourses();
      setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Course'}
        </Button>
      </div>
      {showForm && <CourseForm onSubmit={() => setShowForm(false)} />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}