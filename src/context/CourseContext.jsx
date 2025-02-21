import React, { createContext, useContext, useReducer } from 'react';

const CourseContext = createContext();

const initialState = {
  courses: [],
  enrolledCourses: [],
  loading: false,
  error: null
};

function courseReducer(state, action) {
  switch (action.type) {
    case 'SET_COURSES':
      return { ...state, courses: action.payload };
    case 'ENROLL_COURSE':
      return {
        ...state,
        enrolledCourses: [...state.enrolledCourses, action.payload]
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.map(course =>
          course.id === action.payload.courseId
            ? { ...course, progress: action.payload.progress }
            : course
        )
      };
    default:
      return state;
  }
}

export function CourseProvider({ children }) {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
}