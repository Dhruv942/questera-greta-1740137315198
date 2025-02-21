import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={() => navigate(`/course/${course.id}`)}
    >
      <img
        src={course.thumbnail}
        alt={course.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
        <p className="text-gray-600 mt-2">Instructor: {course.instructor}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm ${
            course.enrollmentStatus === 'Open' 
              ? 'bg-green-100 text-green-800'
              : course.enrollmentStatus === 'In Progress'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {course.enrollmentStatus}
          </span>
          <span className="text-gray-500 text-sm">{course.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;