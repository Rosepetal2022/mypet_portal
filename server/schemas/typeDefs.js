const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        password: String!
        animal: [Animal]
    }
    type Animal {
        _id: ID
        petname: String
        age: String
        breed: String
        animaltype: String
        weight: String
        food: String
        medication: String
        notes: String
        createdAt: String
    }
    input AnimalInput {
    petname: String
    age: Int
    breed: String
    animaltype: String
    weight: Float
    food: String
    medication: String
    notes: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        users: [User]
        animals(username: String): [Animal]
        animal(_id: ID!): Animal
        user(username: String): User
    }
    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password: String!): Auth
        addAnimal(petname: String!, age: String!, breed: String!, animaltype: String!, weight: String!, food: String!, medication: String!, notes: String, createdAt: String): Animal
        updateAnimal(_id: ID!, input: AnimalInput!): Animal
        deleteAnimal(_id: ID!): User
    }
`;

module.exports = typeDefs; 