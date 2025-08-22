'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createModule, createLecture } from '@/lib/api';
import { Module, lecture } from '@/lib/types';

interface ModuleLectureFormProps {
  type: 'module' | 'lecture';
  courseId: string;
}


interface ModuleFormData {
  type: 'module';
  title: string;
  moduleNumber: number;
}

interface LectureFormData {
  type: 'lecture';
  title: string;
  videoUrl: string;
  pdfNotes: string[];
  moduleId: string;
}

type FormData = ModuleFormData | LectureFormData;


export default function ModuleLectureForm({ type, courseId }: ModuleLectureFormProps) {
  const [formData, setFormData] = useState<FormData>(
    type === 'module'
      ? { type: 'module', title: '', moduleNumber: 0 }
      : { type: 'lecture', title: '', videoUrl: '', pdfNotes: [], moduleId: '' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type === 'module') {
      await createModule({ ...formData, courseId } as Omit<Module, '_id'>);
    } else {
      await createLecture({ ...formData, courseId } as unknown as Omit<lecture, '_id'>);
    }
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <Input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      {formData.type === 'module' ? (
      
        <Input
          type="number"
          placeholder="Module Number"
          value={formData.moduleNumber}
          onChange={(e) =>
            setFormData({ ...formData, moduleNumber: parseInt(e.target.value) || 0 })
          }
        />
      ) : (
        
        <>
          <Input
            type="text"
            placeholder="Video URL"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Module ID"
            value={formData.moduleId}
            onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
          />
          <Input
            type="text"
            placeholder="PDF URLs (comma-separated)"
            onChange={(e) =>
              setFormData({ ...formData, pdfNotes: e.target.value.split(',') })
            }
          />
        </>
      )}

      <Button type="submit">Save {formData.type === 'module' ? 'Module' : 'Lecture'}</Button>
    </form>
  );
}
