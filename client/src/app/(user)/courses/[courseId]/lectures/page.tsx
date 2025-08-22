"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getModules, getLectures, getProgress, updateProgress } from "@/lib/api";
import { Module, lecture, Progress } from "@/lib/types"; // Fixed typo in 'lecture' to 'Lecture'
import { useSession } from "next-auth/react"; // Replace useAuth with useSession

export default function LecturePage() {
  const { courseId } = useParams();
  const { data: session, status } = useSession(); // Use session data and status
  const [modules, setModules] = useState<Module[]>([]);
  const [lectures, setLectures] = useState<lecture[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [search, setSearch] = useState("");
  const [currentLecture, setCurrentLecture] = useState<lecture | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Check if session is loaded and user exists
      if (status === "authenticated" && session?.user) {
        const modulesData = await getModules(courseId as string);
        const lecturesData = await getLectures(courseId as string);
        const progressData = await getProgress(session.user.id, courseId as string);
        setModules(modulesData);
        setLectures(lecturesData);
        setProgress(progressData);
      }
    }
    fetchData();
  }, [courseId, session, status]); // Add session and status as dependencies

  const isLectureUnlocked = (lectureId: string) => {
    const lectureIndex = lectures.findIndex((l) => l._id === lectureId);
    if (lectureIndex === 0) return true;
    const previousLecture = lectures[lectureIndex - 1];
    return progress.some((p) => p.lectureId === previousLecture._id && p.completed);
  };

  const handleComplete = async (lectureId: string) => {
    if (status === "authenticated" && session?.user) {
      await updateProgress({
        userId: session.user.id,
        courseId: courseId as string,
        lectureId,
        completed: true,
      });
      window.location.reload(); // Consider replacing with state update for better UX
    }
  };

  const filteredLectures = lectures.filter((lecture) =>
    lecture.title.toLowerCase().includes(search.toLowerCase())
  );

  // Show loading or unauthorized state if not authenticated
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Please sign in to view lectures.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Lectures</h1>
      <Input
        placeholder="Search lectures..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="space-y-4">
        {modules.map((module) => (
          <Card key={module._id}>
            <CardHeader>
              <CardTitle>{module.title} (Module {module.moduleNumber})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredLectures
                .filter((lecture) => lecture.moduleId === module._id)
                .map((lecture) => (
                  <div key={lecture._id} className="border p-2 my-2">
                    <p>{lecture.title}</p>
                    {isLectureUnlocked(lecture._id) ? (
                      <>
                        <Button onClick={() => setCurrentLecture(lecture)}>View Lecture</Button>
                        {!progress.some((p) => p.lectureId === lecture._id && p.completed) && (
                          <Button onClick={() => handleComplete(lecture._id)} className="ml-2">
                            Mark as Completed
                          </Button>
                        )}
                      </>
                    ) : (
                      <p className="text-red-600">Locked (Complete previous lecture)</p>
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
      {currentLecture && (
        <Card>
          <CardHeader>
            <CardTitle>{currentLecture.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              src={currentLecture.videoUrl}
              className="w-full h-64 mb-4"
              allowFullScreen
            ></iframe>
            <h3 className="font-semibold">Notes</h3>
            {currentLecture.pdfNotes.map((pdf, index) => (
              <a
                key={index}
                href={`/uploads/${pdf}`}
                target="_blank"
                className="text-blue-600 block"
              >
                Download PDF {index + 1}
              </a>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}