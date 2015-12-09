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

let _instructors = [
  {id: 1, lastname: "Buna", firstname: "Samer", gender: "Fish", age: 12},
  {id: 2, lastname: "Nichols", firstname: "Cade", gender: "Arctic", age: 97},
];

let _students = [
  {id: 3, lastname: "Richter", firstname: "Paul", gender: "Quail", age: 27, level: 9000},
  {id: 4, lastname: "Pringleton", firstname: "Ammar", gender: "Green", age: 52, level: 4},
];

let _courses = [
  { name: "Pirate Linguistics", instructor: 1 },
  { name: "Bird Gonads 101", instructor: 2 },
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
          return (s.firstname === filter) || (s.lastname === filter)
        })
      }


    })
  })
})

export default schema;
