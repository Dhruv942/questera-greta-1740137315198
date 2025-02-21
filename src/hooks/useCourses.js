import { useState, useEffect } from 'react';
import { useCourseContext } from '../context/CourseContext';

// Sample course data
const sampleCourses = [
  {
    id: 1,
    name: "Introduction to React",
    instructor: "John Doe",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    description: "Learn the fundamentals of React development",
    enrollmentStatus: "Open",
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays",
    location: "Online",
    prerequisites: ["Basic JavaScript", "HTML & CSS"],
    syllabus: [
      {
        week: 1,
        topic: "React Basics",
        content: "Introduction to React, Virtual DOM, JSX"
      },
      {
        week: 2,
        topic: "Components",
        content: "Functional Components, Class Components, Props & State"
      }
    ]
  },
  {
    id: 2,
    name: "Advanced JavaScript",
    instructor: "Jane Smith",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    description: "Master advanced JavaScript concepts",
    enrollmentStatus: "In Progress",
    duration: "10 weeks",
    schedule: "Mondays and Wednesdays",
    location: "Online",
    prerequisites: ["JavaScript Basics"],
    syllabus: [
      {
        week: 1,
        topic: "Advanced Functions",
        content: "Closures, Currying, Higher-Order Functions"
      },
      {
        week: 2,
        topic: "Async Programming",
        content: "Promises, Async/Await, Event Loop"
      }
    ]
  }
];

export function useCourses() {
  const { state, dispatch } = useCourseContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchCourses = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch({ type: 'SET_COURSES', payload: sampleCourses });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [dispatch]);

  return {
    courses: state.courses,
    loading,
    error
  };
}