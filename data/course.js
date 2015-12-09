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

let courseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    instructor: {
      type: instructorType,
      resolve: (obj) => obj.instructor
    },
    name: {
      type: GraphQLString,
      resolve: (obj) => obj.name
    }
  })
})

export default courseType;
