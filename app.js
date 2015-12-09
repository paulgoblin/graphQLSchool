var express = require('express');
var app = express();

import schema from './data/schema';
import GraphQLHTTP from "express-graphql";

app.use("/graphql", GraphQLHTTP({
  schema,
  graphiql: true
}));


module.exports = app;
