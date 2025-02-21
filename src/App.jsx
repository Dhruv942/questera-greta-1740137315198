import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CourseProvider } from './context/CourseContext';
import CourseList from './pages/CourseList';
import CourseDetails from './pages/CourseDetails';
import StudentDashboard from './pages/StudentDashboard';
import Navigation from './components/Navigation';

function App() {
  return (
    <CourseProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
          </Routes>
        </div>
      </Router>
    </CourseProvider>
  );
}

export default App;