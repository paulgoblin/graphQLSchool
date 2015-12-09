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

let studentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    lastname: {
      type: GraphQLString,
      resolve: (obj) => obj.lastname
    },
    firstname: {
      type: GraphQLString,
      resolve: (obj) => obj.firstname
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
      resolve: (obj) => obj.firstname + ' ' + obj.lastname
    }

  })
})

export default studentType;
