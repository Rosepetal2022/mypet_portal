# My Pet Portal

The Pet Portal App allows users to manage pet profiles, track health metrics (Temperature, Pulse, and Respiration - TPR), and search for nearby veterinary clinics.

## Menu

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)

## Features

These features are available as seperate microservices.

- **Pet Profiles:** Create and manage individual pet profiles, including breed and other relevant details.
- **TPR Tracking:** Input and monitor your pet's Temperature, Pulse, and Respiration (TPR).
- **Veterinary Clinic Search:** Find and view contact details for nearby veterinary clinics.

## Tech Stack

- **Frontend:** React, Reactstrap
- **Backend:** Node.js, Express, GraphQL
- **Database:** MongoDB Atlas

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rosepetal2022/mypet-portal.git
   cd mypet-portal
   ```
2. npm install
    ``` npm install ```
4. Start the aplication from the root folder.
    ```npm run develop```

## Microservices Setup

Three of the features in this app are powered by microservices. Each microservice neees to be cloned and run separately in its own environment.

1. Pet Health Check Microservice
A health check microservice that allows you to enter you pets temperature, pulse, and resportaion. You will recieve a message  based on the stats.
```bash
git clone https://github.com/Rosepetal2022/pet-health-check-microservice.git
cd pet-health-check-microservice
npm install
node server.js
```

2. Dog Breed Microservice
A dog encyclopedia that displays dog breeds and detailed information on all the dog breeds.
```bash
git clone https://github.com/Rosepetal2022/dog-breed-microservice.git
cd dog-breed-microservice
npm install
node server.js
```

3. Vet Clinic Microservice
A microservice that allows you to search for vet clinics and see the relevant information.
```bash
git clone https://github.com/Rosepetal2022/vet-clinic-microservice.git
cd vet-clinic-microservice
npm install
node server.js
```

## Usage 

Create a pet profile. Add details about your pet to the profile. You can visit the health check page and input TPR data for more health metrics on your pet.

## Contact
For questions for support, please contact: 
+ **Email** marcotter25@yahoo.com
+ **GitHub** [Rosepetal2022](https://github.com/Rosepetal2022)