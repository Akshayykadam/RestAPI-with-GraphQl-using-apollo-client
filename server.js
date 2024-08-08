const API_KEY = 'R0xQpKsyP88hJAb8CzK5FA==uaB2ffu5EO8MDpgH';
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

// GraphQL schema
const typeDefs = gql`
  type Exercise {
    name: String
    type: String
    muscle: String
    equipment: String
    difficulty: String
    instructions: String
  }

  type Query {
    exercises(muscle: String!): [Exercise]
    exercise(name: String!): Exercise
  }
`;

const resolvers = {
  Query: {
    exercises: async (_, { muscle }) => {
      try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
          headers: { 'X-Api-Key': API_KEY },
        });
        return response.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    exercise: async (_, { name }) => {
      try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?name=${name}`, {
          headers: { 'X-Api-Key': API_KEY },
        });
        return response.data[0]; // Adjust as needed based on the API response
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
};

// Function to start the server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

// Start the server
startServer();

