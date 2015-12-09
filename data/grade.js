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

import studentType from './student'
import courseType from './course'

let gradeType = new GraphQLObjectType({
  name: 'Grade',
  fields: () => ({
    student: {
      type: studentType,
      resolve: (obj) => obj.student
    },
    course: {
      type: courseType,
      resolve: (obj) => obj.course
    },
    grade: {
      type: GraphQLID,
      resolve: (obj) => obj.grade
    }

  })
})

export default gradeType;
