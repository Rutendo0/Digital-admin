# Parirenyatwa Hospital Admin Dashboard

## Overview

This is a Next.js-based admin dashboard for Parirenyatwa Hospital management. The application provides administrators with tools to manage doctor verifications, appointments, patient queues, and view overall system statistics. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4, the dashboard features a modern, responsive interface for hospital administrative tasks.

## Recent Changes

**November 10, 2025** - Migrated from Vercel to Replit
- Configured Next.js to run on port 5000 with host 0.0.0.0 for Replit compatibility
- Updated package.json scripts for both development and production environments
- Configured autoscale deployment in .replit file with proper build and run commands
- Verified application runs without critical errors on Replit platform
- All dependencies installed successfully with no vulnerabilities

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 16 with App Router
- The application uses Next.js App Router for file-based routing and server/client component architecture
- Pages are organized under `src/app/` with route groups for different sections (dashboard, doctors, appointments, queue, profile)
- Client-side interactivity is handled through React 19 with the `'use client'` directive for components requiring state management

**Styling Solution**: Tailwind CSS v4
- Uses the new `@tailwindcss/postcss` plugin architecture
- Custom CSS variables defined in `globals.css` for consistent theming (colors, spacing, sidebar width)
- Component-level utility classes with custom component classes for reusable UI patterns (buttons, cards, badges)
- Design system features a hospital-appropriate color scheme with primary (indigo), secondary (green), and accent colors

**Component Structure**
- Layout components: `DashboardLayout`, `Sidebar`, `Header` - provide consistent navigation and structure
- Feature components: `DoctorVerification`, `AppointmentSchedule`, `PatientQueue` - handle specific administrative functions
- UI components: `StatsCard`, `Modal` - reusable interface elements
- All components are TypeScript-typed with proper interfaces for props

**State Management**
- Currently uses React's built-in `useState` and `useEffect` hooks for local component state
- No global state management library implemented (Redux, Zustand, etc.)
- Data fetching happens at the component level through utility functions
- Page reloads are used for cross-component updates (intended for future optimization)

### Backend Architecture

**Data Layer**: Mock Database Implementation
- Current implementation uses in-memory mock data via `src/utils/database.ts`
- Provides CRUD-like functions: `listDoctors()`, `updateDoctor()`, `listAppointments()`, `listPatientQueue()`, `updatePatientQueue()`
- Data structure uses `objectId` and `objectData` pattern, suggesting preparation for a document-based database
- Mock data includes doctors with verification statuses, appointments, and patient queue entries

**API Pattern**
- No API routes currently implemented
- Direct function imports from database utilities (client-side only)
- Architecture is prepared for future backend integration through the abstracted database utility layer

**Authentication & Authorization**
- No authentication system currently implemented
- Basic logout functionality exists in Header component (redirects to home)
- Placeholder admin user profile
- Future implementation needed for secure access control

### Data Models

**Doctor Model**
```typescript
{
  objectId: string
  objectData: {
    name: string
    specialty: string
    practiceNumber: string
    email: string
    status: 'pending' | 'verified' | 'rejected'
    biography: string
    education: string
    profilePicture: string
  }
}
```

**Appointment Model**
```typescript
{
  objectId: string
  objectData: {
    time: string
    patientName: string
    doctorName: string
    department: string
    status: 'scheduled' | 'completed' | 'cancelled'
  }
}
```

**Patient Queue Model**
```typescript
{
  objectId: string
  objectData: {
    name: string
    department: string
    queueTime: string
    status: 'waiting' | 'completed'
  }
}
```

### Design Decisions

**Server Configuration**
- Development and production servers configured to run on port 5000 with `0.0.0.0` binding for network accessibility
- Custom dev indicator positioned at bottom-right to avoid UI interference

**TypeScript Configuration**
- Strict mode enabled for type safety
- Path alias `@/*` configured for clean imports from `src/` directory
- Target ES2017 for modern JavaScript features while maintaining compatibility

**Development vs Production Separation**
- Mock data layer allows frontend development without backend dependency
- Clear separation between UI logic and data access prepares for backend integration
- Database utility functions provide abstraction layer for easy swapping to real API calls

## External Dependencies

### Core Framework Dependencies

**Next.js 16.0.1**
- React framework providing App Router, server components, and optimized builds
- Handles routing, server-side rendering, and static generation

**React 19.2.0 & React DOM 19.2.0**
- Latest React version with improved concurrent features
- Provides component model and rendering engine

### Development Dependencies

**TypeScript 5.x**
- Provides static typing and enhanced developer experience
- Type definitions for Node, React, and React DOM included

**Tailwind CSS v4**
- Utility-first CSS framework using new PostCSS plugin architecture
- `@tailwindcss/postcss` for build-time CSS processing

**ESLint 9.x**
- Code linting with Next.js-specific configuration (`eslint-config-next`)
- Ensures code quality and catches common errors

### Third-Party UI Resources

**Lucide Icon Font**
- Icon library loaded from CDN (`https://resource.trickle.so/vendor_lib/unpkg/lucide-static@0.516.0/font/lucide.css`)
- Provides consistent iconography throughout the application
- Used via CSS classes (e.g., `icon-hospital`, `icon-user-check`)

**Google Fonts - Inter**
- Primary typeface loaded via `next/font` optimization
- Provides clean, readable interface typography

### Future Integration Points

**Database** (Not yet implemented)
- The data model structure suggests preparation for a document-based database (MongoDB, Firebase, or similar)
- Current mock implementation can be replaced with actual database client

**Authentication Service** (Not yet implemented)
- No auth provider currently integrated
- Will require OAuth, JWT, or session-based authentication

**Real-time Updates** (Not yet implemented)
- Patient queue and appointment schedule would benefit from WebSocket or polling for live updates

**File Storage** (Not yet implemented)
- Profile pictures currently use external URLs
- Will need cloud storage integration (AWS S3, Cloudinary, etc.) for user-uploaded images