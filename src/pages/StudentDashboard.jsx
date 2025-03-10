import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiCheck, FiAward } from 'react-icons/fi';
import { useCourseContext } from '../context/CourseContext';

const StudentDashboard = () => {
  const { state, dispatch } = useCourseContext();
  const { enrolledCourses } = state;

  const handleUpdateProgress = (courseId, progress) => {
    dispatch({
      type: 'UPDATE_PROGRESS',
      payload: { courseId, progress }
    });
  };

  const handleMarkCompleted = (courseId) => {
    dispatch({
      type: 'MARK_COMPLETED',
      payload: courseId
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Courses</h1>
      
      {enrolledCourses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map(course => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="w-full h-48 object-cover"
                />
                {course.completed && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                    <FiAward size={20} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
                <p className="text-gray-600 mt-2">Instructor: {course.instructor}</p>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Enrolled: {format(new Date(course.enrollmentDate), 'MMM dd, yyyy')}
                  </p>
                  {course.completed && (
                    <p className="text-sm text-green-600 mt-1">
                      Completed: {format(new Date(course.completionDate), 'MMM dd, yyyy')}
                    </p>
                  )}
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          course.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {!course.completed && (
                    <>
                      <div className="mt-4">
                        <label className="text-sm text-gray-600">Update Progress:</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={course.progress}
                          onChange={(e) => handleUpdateProgress(course.id, parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <button
                        onClick={() => handleMarkCompleted(course.id)}
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <FiCheck />
                        Mark as Completed
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default StudentDashboard;