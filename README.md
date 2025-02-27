# Mystery-Message

Mystery-Message is an anonymous messaging platform built using **Next.js**, **MongoDB**, **Tailwind CSS**, and **ShadCN**. It allows users to send and receive anonymous messages, with AI-powered message suggestions using **Vercel AI SDK** and **Gemini API**.

## Features

- Anonymous Messaging: Users can send and receive messages without revealing their identity.

- AI-Powered Suggestions: Uses Vercel AI SDK and Gemini API to suggest messages.

- Modern UI: Styled with Tailwind CSS and ShadCN for a sleek, user-friendly interface.

- MongoDB Database: Stores messages securely with efficient querying.

- Authentication: Uses NextAuth for secure user authentication.

- Serverless Deployment: Optimized for Vercel.

## Tech Stack

- Framework: Next.js

- Database: MongoDB

- Styling: Tailwind CSS, ShadCN

- AI Integration: Vercel AI SDK, Gemini API

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Omkar-t06/Mystery-Message.git
    cd mystery-message
    ```

1. Install dependencies:
    ```
    npm install
    ```
1. Set up environment variables in a .env.local file:
    ```
    MONGODB_URI=your-mongodb-uri
    NEXTAUTH_SECRET=your-secret
    RESEND_API_KEY=your-api-key
    GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key
    ```

1. Run the development server:
    ```
    npm run dev
    ```

1. Open http://localhost:3000 in your browser.

## Deployment

This project is optimized for deployment on **Vercel**. To deploy:

1. Push the repository to GitHub.

2. Connect the repo to Vercel and set environment variables.

3. Deploy the project with a single click.

## Credits

This project was built following and completing assignments from a tutorial by Chai aur Code. You can check out the tutorial series here:
[YouTube Playlist: Chai aur full stack NextJS](https://youtube.com/playlist?list=PLu71SKxNbfoBAaWGtn9GA2PTw0HO0tXzq&si=xPJSg1yJTUB12uXk)

Feel free to contribute, suggest features, or report issues. Happy coding! 🚀