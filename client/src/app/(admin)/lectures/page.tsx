"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { getCourses, getModules, getLectures, deleteLecture } from '@/lib/api';
import { Course, Module, lecture } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function LectureManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lectures, setLectures] = useState<lecture[]>([]);
  const [courseFilter, setCourseFilter] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      const coursesData = await getCourses();
      setCourses(coursesData);
      if (courseFilter) {
        const modulesData = await getModules(courseFilter);
        setModules(modulesData);
      }
      const lecturesData = await getLectures(courseFilter, moduleFilter);
      setLectures(lecturesData);
    }
    fetchData();
  }, [courseFilter, moduleFilter]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lecture?')) {
      await deleteLecture(id);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Lecture Management</h1>
      <div className="flex space-x-4">
        <Input
          placeholder="Filter by Course ID"
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        />
        <Input
          placeholder="Filter by Module ID"
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Module ID</TableHead>
            <TableHead>Video</TableHead>
            <TableHead>PDFs</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lectures.map((lecture) => (
            <TableRow key={lecture._id}>
              <TableCell>{lecture.title}</TableCell>
              <TableCell>{lecture.moduleId}</TableCell>
              <TableCell>
                <a href={lecture.videoUrl} target="_blank" className="text-blue-600">
                  View
                </a>
              </TableCell>
              <TableCell>
                {lecture.pdfNotes.map((pdf, index) => (
                  <a key={index} href={`/uploads/${pdf}`} target="_blank" className="text-blue-600 block">
                    PDF {index + 1}
                  </a>
                ))}
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDelete(lecture._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}