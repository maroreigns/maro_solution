# Maro Solution

A local business directory platform for Nigeria.

## Features

- Homepage with search
- Listings page with filters
- Add business form
- Responsive design
- WhatsApp contact integration

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose

## Installation

1. Install Node.js and MongoDB.

2. Clone or download the project.

3. Navigate to the server directory:

   cd server

4. Install dependencies:

   npm install

5. Start MongoDB (e.g., mongod)

6. Start the server:

   npm start

7. Open your browser and go to http://localhost:3000

## Usage

- Homepage: Search for businesses by category and location.
- Listings: View all businesses, filter by category and location.
- Add Business: Submit a form to add a new business.

## API Endpoints

- GET /api/businesses?category=&location= - Get filtered businesses
- POST /api/businesses - Add a business

## Notes

- Ensure MongoDB is running on localhost:27017
- Database name: maro_solution
- For WhatsApp links, phone numbers should be in international format.