# Tennis Club Booking API

## Setup and Running Locally

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Set up environment variables as described in `.env.example`.
4. Start the server with `npm start`.

## API Documentation

### Users

#### Create a new user

- **Endpoint**: `POST /api/users`
- **Description**: Creates a new user account.
- **Request Body**:
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Response**: Returns the newly created user object.

#### Log in an existing user

- **Endpoint**: `POST /api/users/login`
- **Description**: Logs in an existing user.
- **Request Body**:
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Response**: Returns a JWT token for authentication.

### Court

#### Book a tennis court

- **Endpoint**: `POST /api/court/booking`
- **Description**: Allows a user to book a tennis court.
- **Request Body**:
  - `courtId` (string): ID of the tennis court to book.
  - `userId` (string): ID of the user booking the court.
  - `dateTime` (string): Date and time of the booking.
- **Response**: Returns confirmation of the booking.

#### Get information about booked courts

- **Endpoint**: `GET /api/court/booked`
- **Description**: Retrieves information about currently booked courts.
- **Response**: Returns a list of booked courts with details.

#### Cancel a booked court

- **Endpoint**: `DELETE /api/court/booking`
- **Description**: Cancels a booked tennis court.
- **Request Body**:
  - `bookingId` (string): ID of the booking to cancel.
- **Response**: Returns confirmation of the cancellation.

## Entity-Relationship Diagram

+-----------+          +------------+
|   User    |          |   Court    |
+-----------+          +------------+
|   _id     |1         |   _id      |
|   name    |----------| timeBooked |
|username   |          | courtBooked|
| password  |          | dayBooked  |
|   id      |          | userBooked |1
|  delete   |          | yearBooked |
|   role    |          | monthBooked|
+-----------+          +------------+
