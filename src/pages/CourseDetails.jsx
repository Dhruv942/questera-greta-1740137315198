import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiCalendar, FiCheck } from 'react-icons/fi';
import { useCourseContext } from '../context/CourseContext';

const CourseDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useCourseContext();
  const [expandedSection, setExpandedSection] = useState(null);

  const course = state.courses.find(c => c.id === parseInt(id));

  if (!course) {
    return <div className="text-center mt-8">Course not found</div>;
  }

  const handleEnroll = () => {
    dispatch({
      type: 'ENROLL_COURSE',
      payload: { ...course, progress: 0, enrollmentDate: new Date() }
    });
  };

  const isEnrolled = state.enrolledCourses.some(c => c.id === course.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800">{course.name}</h1>
            <span className={`px-4 py-2 rounded-full text-sm ${
              course.enrollmentStatus === 'Open'
                ? 'bg-green-100 text-green-800'
                : course.enrollmentStatus === 'In Progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {course.enrollmentStatus}
            </span>
          </div>
          
          <p className="text-gray-600 mt-4">{course.description}</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <FiClock className="text-blue-500 mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <FiCalendar className="text-blue-500 mr-2" />
              <span>{course.schedule}</span>
            </div>
            <div className="flex items-center">
              <FiMapPin className="text-blue-500 mr-2" />
              <span>{course.location}</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
            <ul className="list-disc list-inside space-y-2">
              {course.prerequisites.map((prereq, index) => (
                <li key={index} className="text-gray-600">{prereq}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Syllabus</h2>
            <div className="space-y-4">
              {course.syllabus.map((section, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full px-4 py-3 flex justify-between items-center bg-gray-50"
                    onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                  >
                    <span className="font-medium">Week {section.week}: {section.topic}</span>
                    <FiCheck className={`transform transition-transform ${
                      expandedSection === index ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {expandedSection === index && (
                    <div className="px-4 py-3 bg-white">
                      <p className="text-gray-600">{section.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {!isEnrolled && course.enrollmentStatus === 'Open' && (
            <button
              onClick={handleEnroll}
              className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetails;