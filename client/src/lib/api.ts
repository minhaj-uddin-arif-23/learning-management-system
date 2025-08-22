import axios from 'axios';
import { Course, Module, lecture, Progress } from './types';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust to your backend URL

// Course APIs
export const getCourses = async () => {
  const response = await axios.get<Course[]>(`${API_BASE_URL}/courses`);
  return response.data;
};

export const createCourse = async (courseData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/courses/addCourse`, courseData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};


export const updateCourse = async (id: string, course: Partial<Course>) => {
  const response = await axios.put<Course>(`${API_BASE_URL}/courses/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/courses/${id}`);
};

// Module APIs
export const getModules = async (courseId: string) => {
  const response = await axios.get<Module[]>(`${API_BASE_URL}/modules?courseId=${courseId}`);
  return response.data;
};

export const createModule = async (module: Omit<Module, '_id'>) => {
  const response = await axios.post<Module>(`${API_BASE_URL}/modules`, module);
  return response.data;
};

export const updateModule = async (id: string, module: Partial<Module>) => {
  const response = await axios.put<Module>(`${API_BASE_URL}/modules/${id}`, module);
  return response.data;
};

export const deleteModule = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/modules/${id}`);
};

// Lecture APIs
export const getLectures = async (courseId?: string, moduleId?: string) => {
  const params = new URLSearchParams();
  if (courseId) params.append('courseId', courseId);
  if (moduleId) params.append('moduleId', moduleId);
  const response = await axios.get<lecture[]>(`${API_BASE_URL}/lectures?${params.toString()}`);
  return response.data;
};

export const createLecture = async (lecture: Omit<lecture, '_id'>) => {
  const response = await axios.post<lecture>(`${API_BASE_URL}/lectures`, lecture);
  return response.data;
};

export const updateLecture = async (id: string, lecture: Partial<lecture>) => {
  const response = await axios.put<lecture>(`${API_BASE_URL}/lectures/${id}`, lecture);
  return response.data;
};

export const deleteLecture = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/lectures/${id}`);
};

// Progress APIs
export const getProgress = async (userId: string, courseId?: string) => {
  const response = await axios.get<Progress[]>(`${API_BASE_URL}/progres?userId=${userId}${courseId ? `&courseId=${courseId}` : ''}`);
  return response.data;
};

export const updateProgress = async (progress: Omit<Progress, 'completed'> & { completed: boolean }) => {
  const response = await axios.post<Progress>(`${API_BASE_URL}/progres`, progress);
  return response.data;
};