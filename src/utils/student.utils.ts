export interface Student {
  name: string;
  age: number;
  grade: number;
}

const PASS_GRADE = 60;

export function filterPassedStudents(students: Student[]): Student[] {
  return students.filter((s) => s.grade >= PASS_GRADE);
}

export function getStudentNames(students: Student[]): string[] {
  return students.map((s) => s.name);
}

export function sortStudentsByGrade(students: Student[]): Student[] {
  return [...students].sort((a, b) => b.grade - a.grade);
}

export function getAverageAge(students: Student[]): number {
  if (students.length === 0) return 0;
  const sum = students.reduce((acc, s) => acc + s.age, 0);
  return sum / students.length;
}
