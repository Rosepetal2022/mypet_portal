import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }`;

    export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!) {
        addUser(username: $username, password: $password) {
          token
          user {
            password
            username  
          }
        }
      }`;

      export const ADD_ANIMAL = gql`
      mutation addAnimal($petname: String!, $age: String!, $breed: String!, $animaltype: String!, $weight: String!) {
        addAnimal(petname: $petname, age: $age, breed: $breed, animaltype: $animaltype, weight: $weight) {
          petname,
          age,
          animaltype,
          weight,
          breed
        }
      }`;