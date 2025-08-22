export interface User{
  id:string,
  role:'admin' | 'user',
  name:string,
  email:string
}

export interface Course{
  _id:string,
  thumbnail : string,
  title:string,
  price:number,
  description:string
}

export interface Module{
  _id:string,
  courseId:string,
  title:string,
  moduleNumber:number
}

export interface lecture{
  _id:string;
  moduleId:string,
  title:string,
  videoUrl:string,
  pdfNotes:string[]
}

export interface Progress{
  userId:string,
  courseId:string,
  lectureId:string,
  completed:boolean
}

