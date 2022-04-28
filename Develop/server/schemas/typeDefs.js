const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    bookCount: INT
    savedBooks: [book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String!]
    description: String!
    bookId: String!
    image: String
    link: String!
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!) : Auth
    addUser(need to fill this) : Auth
    saveBook(bookData: BookInput!) : User
    removeBook(bookId: ID!) : User
  }
`;

module.exports = typeDefs;
