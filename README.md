# Chad Civic Engagement Platform - Frontend (Next.js)

This repository contains the source code for the Frontend of the Chad Civic Engagement Platform. It is built using Next.js to provide a fast, responsive, and modern user interface for citizens accessing information about elected officials, regions, and announcements.

## Features

- Modern UI built with Next.js and React.
- API Integration with the Strapi Backend.
- Dynamic Pages for Officials, Regions, and Announcements.
- Client-side and server-side rendering for optimal performance.
- Internationalization (i18n) support.
- Secure authentication for institutional users (if applicable).
- Responsive design across devices.

## Tech Stack

- **Framework:** Next.js (React)
- **Language:** JavaScript / TypeScript (optional)
- **Styling:** Tailwind CSS / CSS Modules (whichever you're using)
- **State Management:** (e.g., Redux, Zustand)  
- **Deployment:** Vercel / Netlify / Heroku (depending on your setup)

## Prerequisites

Ensure you have the following installed:

- Node.js (v18.x recommended)
- npm or yarn
- Access to the Backend API URL

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/chad-civic-frontend.git
cd chad-civic-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and fill in the necessary environment variables.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_APP_NAME=Chad Civic Engagement Platform
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

The application will be accessible at:

```
http://localhost:3000
```

## Project Structure

Below is an example structure of the Next.js project:

```
/components
/pages
/pages/api
/public
/styles
/utils
/hooks
```

## Key Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the production version.
- `npm start`: Run the production server.
- `npm run lint`: Lint the project.

## API Integration

The frontend consumes the Strapi backend via REST API endpoints.

Example fetch request:

```javascript
export async function getOfficials() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/officials`);
  return res.json();
}
```

## Deployment

### Vercel Deployment

To deploy on Vercel:

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repository to Vercel for automatic deployments.

## Contribution

- Fork the repository.
- Create a feature branch.
- Commit your changes.
- Push your branch.
- Open a Pull Request.

