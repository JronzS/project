 Encrypted Messaging App

 Overview
This project is a secure messaging application built with a Django REST Framework (DRF) backend and a Vue.js frontend. It ensures end-to-end encryption for message content, protecting user data at rest. The backend handles user authentication, message encryption/decryption, and provides APIs for communication between the frontend and backend.

 Features
- User authentication (signup, login, and token-based authentication).
- Encrypted messaging using symmetric encryption (Fernet).
- APIs for retrieving messages by sender, receiver, or both.
- Secure message storage with encrypted content in the database.
- Vue.js frontend for user interaction.

Technology Stack

Backend
- Framework: Django + Django REST Framework
- Encryption: Cryptography (Fernet)
- Authentication: Token-based (SimpleJWT)

Frontend
- Framework: Vue.js

Database
- Compatible with any Django-supported database (SQLite, PostgreSQL, etc.).

---

Backend Setup

Prerequisites
- Python 3.x
- Django 4.x
- Pip (Python package manager)

Installation
1. Clone the Repository**
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Set Up a Virtual Environment**
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. nstall Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**
   Create a `.env` file in the project root and add:
   ```env
   SECRET_KEY=your_django_secret_key
   DEBUG=True
   ENCRYPTION_KEY=your_fernet_key  # Generate using Fernet.generate_key()
   ```

5. Run Database Migrations**
   ```bash
   python manage.py migrate
   ```

6. **Start the Development Server**
   ```bash
   python manage.py runserver
   ```

---

API Endpoints

Authentication
- Signup**: `/api/signup/` (POST)
- Login**: `/api/login/` (POST)
- Token Refresh**: `/api/refresh/` (POST)

User Information
- Get Current User**: `/api/me/` (GET)
- Get All Users**: `/api/users/` (GET)

Messaging
- Create a Message: `/api/messages/` (POST)
- Get Messages by Sender and Receiver: `/api/messages/` (GET with `sender_id` and `receiver_id` query params)
- Get Messages by Sender: `/api/messages-by-sender/` (GET with `sender_id` query param)
- Get Messages by Receiver: `/api/messages-by-receiver/` (GET with `receiver_id` query param)

---

Frontend Setup

Prerequisites
- Node.js (v14 or higher)
- npm or Yarn

Installation
1. Navigate to the Frontend Directory**
   ```bash
   cd frontend
   ```

2.Install Dependencies
   ```bash
   npm install  # Or: yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the frontend root and add:
   ```env
   VUE_APP_API_BASE_URL=http://localhost:8000/api/
   ```

4.Start the Development Server
   ```bash
   npm run serve  # Or: yarn serve
   ```

---

Message Encryption

How It Works
- Encryption: The message content is encrypted using a symmetric encryption key before saving it to the database.
- Decryption When a message is retrieved, the content is decrypted before being sent to the frontend.
- Key Management: The encryption key is stored securely in the backend environment variables.

---

Security Features
- Encrypted message storage ensures sensitive data is protected at rest.
- Token-based authentication using SimpleJWT.
- Permissions ensure only authenticated users can access APIs.
