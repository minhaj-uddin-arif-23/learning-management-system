"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProgress, getCourses, getLectures } from "@/lib/api";
import { Progress, Course, lecture } from "@/lib/types"; 
import { useSession } from "next-auth/react"; 

export default function ProgressDashboard() {
  const { data: session, status } = useSession(); 
  const [progress, setProgress] = useState<Progress[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [lectures, setLectures] = useState<lecture[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (status === "authenticated" && session?.user) {
        const progressData = await getProgress(session.user.id);
        const coursesData = await getCourses();
        const lecturesData = await getLectures();
        setProgress(progressData);
        setCourses(coursesData);
        setLectures(lecturesData);
      }
    }
    fetchData();
  }, [session, status]); 

  const getCourseProgress = (courseId: string) => {
    const courseLectures = lectures.filter((l) => l.courseId === courseId);
    const completed = progress.filter((p) => p.courseId === courseId && p.completed).length;
    return (completed / courseLectures.length) * 100 || 0;
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Please sign in to view your progress.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Progress</h1>
      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course._id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Progress: {Math.round(getCourseProgress(course._id))}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${getCourseProgress(course._id)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}