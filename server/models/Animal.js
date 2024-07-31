const { Schema, model } = require('mongoose');


//Schema for Animals
const animalSchema = new Schema(
    {
        petname: {
            type: String, 
            required: true
        },
        age: {
            type: String,
            required: true
        },
        breed: {
            type: String, 
            required: true
        },
        animaltype: {
            type: String, 
            required: true
        },
        weight: {
            type: String, 
            required: true
        },
        food: {
            type: String, 
            required: true
        },
        medication: {
            type: String, 
            required: true
        },
        notes: {
            type: String, 
            required: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
);

const Animal = model('Animal', animalSchema);

module.exports = Animal;