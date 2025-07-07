import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import studentData from "./studentData.json";

const App = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [aboveEighty, setAboveEighty] = useState(false);

  useEffect(() => {
    // Simulate loading JSON data
    setStudents(studentData);
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchCourse = filter === "All" || student.course === filter;
    const matchMarks = !aboveEighty || student.marks > 80;
    return matchCourse && matchMarks;
  });

  const courses = [...new Set(students.map((s) => s.course))];

  return (
    <div className="container my-5 shadow p-4 rounded bg-white">
      <h1 className="text-center mb-4">Student Performance Viewer</h1>

      <div className="d-flex justify-content-center gap-3 mb-3">
        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Courses</option>
          {courses.map((course, idx) => (
            <option key={idx} value={course}>
              {course}
            </option>
          ))}
        </select>

        <button
          className={`btn ${aboveEighty ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setAboveEighty(!aboveEighty)}
        >
          {aboveEighty ? "Showing > 80" : "Show > 80"}
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="4">No matching records found</td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>{student.marks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;

