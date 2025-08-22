import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ModuleLectureForm from '../../../../../component/admin/ModuleLectureForm';
import { getModules, getLectures } from '@/lib/api';
import { Module, lecture } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ModuleLectureManagement() {
  const { courseId } = useParams();
  const [modules, setModules] = useState<Module[]>([]);
  const [lectures, setLectures] = useState<lecture[]>([]);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showLectureForm, setShowLectureForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const modulesData = await getModules(courseId as string);
      const lecturesData = await getLectures(courseId as string);
      setModules(modulesData);
      setLectures(lecturesData);
    }
    fetchData();
  }, [courseId]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Module & Lecture Management</h1>
      <div className="flex space-x-4">
        <Button onClick={() => setShowModuleForm(!showModuleForm)}>
          {showModuleForm ? 'Cancel' : 'Add Module'}
        </Button>
        <Button onClick={() => setShowLectureForm(!showLectureForm)}>
          {showLectureForm ? 'Cancel' : 'Add Lecture'}
        </Button>
      </div>
      {showModuleForm && <ModuleLectureForm type="module" courseId={courseId as string} />}
      {showLectureForm && <ModuleLectureForm type="lecture" courseId={courseId as string} />}
      <div className="space-y-4">
        {modules.map((module) => (
          <Card key={module._id}>
            <CardHeader>
              <CardTitle>{module.title} (Module {module.moduleNumber})</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">Lectures</h3>
              {lectures
                .filter((lecture) => lecture.moduleId === module._id)
                .map((lecture) => (
                  <div key={lecture._id} className="border p-2 my-2">
                    <p>{lecture.title}</p>
                    <a href={lecture.videoUrl} target="_blank" className="text-blue-600">
                      Video
                    </a>
                    <div>
                      {lecture.pdfNotes.map((pdf, index) => (
                        <a key={index} href={`/uploads/${pdf}`} target="_blank" className="text-blue-600 block">
                          PDF {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}