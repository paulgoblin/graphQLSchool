import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

import instructorType from './instructor'
import studentType from './student'
import courseType from './course'
import gradeType from './grade'

let _instructors = [
  {id: 1, lastName: "Buna", firstName: "Samer", gender: "Fish", age: 12},
  {id: 2, lastName: "Nichols", firstName: "Cade", gender: "Arctic", age: 97},
];

let _students = [
  {id: 3, lastName: "Richter", firstName: "Paul", gender: "Quail", age: 27, level: 9000},
  {id: 4, lastName: "Pringleton", firstName: "Ammar", gender: "Green", age: 52, level: 4},
];

let _courses = [
  { name: "Pirate Linguistics", instructor: 1 },
  { name: "Bird Gonads 101", instructor: 2 },
]

let _grades = [
  { student: 3, course: "Pirate Linguistics", grade: "D"},
  { student: 4, course: "Pirate Linguistics", grade: "B"},
  { student: 3, course: "Bird Gonads 101", grade: "C"},
  { student: 4, course: "Bird Gonads 101", grade: "A"},
]

let counter = 0;

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({

      counter: {
        type: GraphQLInt,
        resolve: () => counter
      },

      allInstructors: {
        type: new GraphQLList(instructorType),
        resolve: () => _instructors
      },

      allStudents: {
        type: new GraphQLList(studentType),
        resolve: () => _students
      },

      allGrades: {
        type: new GraphQLList(gradeType),
        resolve: () => _grades.map(grade => {
          if (typeof grade.course === 'string'){
            grade.course = _courses.find(course => {
              return course.name === grade.course;
            });
          }
          if (typeof grade.course.instructor === 'number'){
            grade.course.instructor = _instructors.find(instructor => {
              return grade.course.instructor === instructor.id
            });
          }

          if (typeof grade.student === 'number'){
            grade.student = _students.find(student => {
              return student.id === grade.student;
            });
          }
          console.log(grade);
          return grade;
        })
      },

      allCourses: {
        type: new GraphQLList(courseType),
        resolve: () => _courses.map(course => {
          course.instructor = _instructors.find(instructor => {
            return instructor.id === course.instructor;
          })
          return course
        })
      },

      students: {
        type: new GraphQLList(studentType),
        args: {
          filter: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: (_,{filter}) => _students.filter(s => {
          return (s.firstName === filter) || (s.lastName === filter)
        })
      }


    })
  })
})

export default schema;
