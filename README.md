# System Architecture
## Frontend

Framework: React.js

UI Styling: Tailwind CSS, React Icons

Routing: React Router

State Management: React Context (for authentication)

Notifications: React Toastify

Data Fetching: Axios

### Components

Home.jsx: Shows clinic info and services.

Booking.jsx: Select dentist and time slot to book an appointment.

Dashboard.jsx: User dashboard to view, reschedule, and cancel appointments.

Login.jsx, Register.jsx: Auth pages with localStorage-based login persistence.

Profile.jsx: Update user details and password.

Header.jsx & Sidebar.jsx: Layout components with conditional render logic.

AuthContext.jsx: For login user authentication and local storaging.

PrivateRoute.jsx: Re-navigate of pages to Login page if there user is not logged in.

## Backend 

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Mongoose ODM)

Authentication: bcrypt for password hashing (commented for easy debugging), JWT for token-based login

API Architecture: RESTful APIs

See link for its components (https://github.com/RonLlave/Dental-Office-Online-Scheduling-System-Backend)


# Additional Notes
Remarks: Didn't make it to have a 5 minute video since I ran out of time for the submission date.

Job Assessment answered by: Ron Cymond Llave (roncymondllave25@gmail.com)
