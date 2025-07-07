import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import studentData from "./studentData.json";

const App = () => {
  const [filter, setFilter] = useState("");
  const [course, setCourse] = useState("All");
  const [showHighScorers, setShowHighScorers] = useState(false);

  const filteredStudents = studentData.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(filter.toLowerCase());
    const matchesCourse = course === "All" || student.course === course;
    const matchesMarks = !showHighScorers || student.marks > 80;
    return matchesName && matchesCourse && matchesMarks;
  });

  const courseOptions = [...new Set(studentData.map((s) => s.course))]; // unique courses

  return (
    <div className="container mt-4">
      <h2>Student Performance Viewer</h2>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Search by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="row mb-3">
        <div className="col-md-6">
          <select
            className="form-select"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="All">All Courses</option>
            {courseOptions.map((courseName, index) => (
              <option key={index} value={courseName}>
                {courseName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 text-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowHighScorers(!showHighScorers)}
          >
            {showHighScorers ? "Show All Marks" : "Show Marks > 80"}
          </button>
        </div>
      </div>

      <table className="table table-bordered">
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
              <td colSpan="4" className="text-center">No students found</td>
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
  );
};

export default App;

