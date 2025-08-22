import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Manage Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create, edit, or delete courses.</p>
            <a href="/course" className="text-blue-600 hover:underline">
              Go to Courses
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lecture Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage modules and lectures for all courses.</p>
            <a href="/admin/lectures" className="text-blue-600 hover:underline">
              Go to Lecture Management
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
