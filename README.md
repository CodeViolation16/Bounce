# Tennis Club Booking App

## Overview

The Tennis Club Booking App is a web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). Follow rules of Chancellors Family Tennis Center. The primary goal of this application is to streamline the process of booking, canceling, and adjusting tennis courts for both clubs and users, eliminating the need for traditional phone calls and saving time for all parties involved.

Demo here (without having to log in): https://finalproject-yscx.onrender.com/home

### Features

- **User Booking Management**: Users can book, cancel, and adjust tennis court bookings via the web interface.
- **Admin Features**: Clubs have access to admin features to manage users, court times, and view statistic (future features).
- **Dynamic Booking**: Users can only book up to 7 days in advance, with the application employing an algorithm to dynamically update available slots for the next 7 days.
- **Email Confirmation**: Users receive email confirmations after successfully booking or canceling a court.
- Responsive CSS
- Reseting Password Feature
- Protected Routes
- Backend Hashing Password

## Authentication

- Users can sign in with their email and password.
- New users can register for an account using their email and password.
- Users remain signed in even after refreshing the page for a seamless experience.

## API Endpoints

### Users

- `POST /users`: Create a new user.
- `POST /users/login`: Log in an existing user.
- `PUT /users/reset/new`: Update the password for an existing user.
- `POST /users/reset`: Reset the password for a user.
- `GET /users/all`: display all users.
- `PUT /users/:userId/soft-delete`: soft deleting users.

### Court

- `POST /court/booking`: Book a tennis court.
- `GET /court/booked`: Get information about booked courts.
- `DELETE /court/booking`: Cancel a booked court.

//Annoucement
`POST /sendannoucment`: send annoucement to BE
`GET /getannoucement`: get annoucement to display.

## Usage

To use the Tennis Club Booking App:

1. Register for an account or log in with existing credentials.
2. Browse available tennis courts and select desired booking slots.
3. Receive email confirmation upon successful booking or cancellation.
4. Admins can manage users, court times, and view statistics through the admin panel.

## Future Improvements

- Implement additional features such as notifications for upcoming bookings.
- Enhance admin features for better user management and analytics.
- Improve user interface for a more intuitive booking experience.

## Conclusion

The Tennis Club Booking App provides a convenient and efficient solution for managing tennis court bookings, benefiting both clubs and users by saving time and streamlining the booking process. With its user-friendly interface and robust features, it aims to enhance the overall tennis club experience.
