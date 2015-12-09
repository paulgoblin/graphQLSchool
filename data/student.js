import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat
} from 'graphql';

let _grades = [
  { student: 3, course: "Pirate Linguistics", grade: "D"},
  { student: 4, course: "Pirate Linguistics", grade: "B"},
  { student: 3, course: "Bird Gonads 101", grade: "C"},
  { student: 4, course: "Bird Gonads 101", grade: "A"},
]

let _courses = [
  { name: "Pirate Linguistics", instructor: 1 },
  { name: "Bird Gonads 101", instructor: 2 },
]

let _instructors = [
  {id: 1, lastName: "Buna", firstName: "Samer", gender: "Fish", age: 12},
  {id: 2, lastName: "Nichols", firstName: "Cade", gender: "Arctic", age: 97},
];

let _GPAdict = {
  A: 4,
  B: 3,
  C: 2,
  D: 1
}

import gradeType from './grade'

let studentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    lastName: {
      type: GraphQLString,
      resolve: (obj) => obj.lastName
    },
    firstName: {
      type: GraphQLString,
      resolve: (obj) => obj.firstName
    },
    age: {
      type: GraphQLInt,
      resolve: (obj) => obj.age
    },
    gender: {
      type: GraphQLString,
      resolve: (obj) => obj.gender
    },
    level: {
      type: GraphQLString,
      resolve: (obj) => obj.level
    },

    fullName: {
      type: GraphQLString,
      resolve: (obj) => obj.firstName + ' ' + obj.lastName
    },

    grades: {
      type: new GraphQLList(gradeType),
      resolve: (obj) => _grades.filter( grade => {
        console.log(grade);
        return grade.student === obj.id
      })
    },

    GPA: {
      type: GraphQLFloat,
      resolve: (obj) => _grades.filter( grade => {
        return grade.student === obj.id
      }).map(grade => grade.grade).reduce((tot,grade,_,grades)=>{
        return tot + _GPAdict[grade]/grades.length
      },0)
    }

  })
})

export default studentType;
