# SewarApp Client

This repository contains the **client-side code** for the **SewarApp**, an innovative application designed for designers to manage their work and showcase their portfolio to the public. The app provides a seamless and intuitive interface for both designers and their clients, working across multiple platforms (mobile and web).

## Main Idea

The SewarApp empowers designers by:
- Providing tools to manage client appointments and project details efficiently.
- Displaying a public portfolio (images/videos) that highlights the designer's work.
- Offering clients an easy way to interact with the designer and explore their portfolio.

The client-side app integrates with a backend server for fetching and storing data, ensuring a smooth user experience across all devices.

## Features

- **Cross-Platform**:
  - Built with **React Native** and **Expo**, enabling it to work seamlessly on **iOS**, **Android**, and **web**.
- **Designer Management**:
  - View and manage appointments, clients, and project data.
- **Public Portfolio**:
  - Showcase images and videos of completed projects for prospective clients.
- **Search Functionality**:
  - Built-in search for filtering clients or appointments.
- **Add/Edit Features**:
  - Add new clients and projects easily.
- **Media Support**:
  - Handles images and videos using Firebase for storage and display.

## Technologies Used

### Framework and Tools
- **React Native**: For building the mobile-first application.
- **Expo**: To streamline development and testing across multiple platforms (iOS, Android, and web).
- **JavaScript**: Core programming language for the application.
- **React Navigation**: For managing navigation between screens.
- **i18next**: For multi-language support (e.g., Arabic, Hebrew, and English).

### Backend Integration
- Fetches data from the **SewarApp Server** (Node.js with MongoDB Atlas) for managing clients and projects.
- Retrieves images and videos from **Firebase** for the designer's portfolio.

### Platform Compatibility
- **Web**: Fully responsive and functional as a Progressive Web App (PWA).
- **Mobile**: Optimized for both iOS and Android.

## Installation and Setup

### Prerequisites
Ensure the following are installed on your system:
- **Node.js** (v14 or higher)
- **Expo CLI**:
  ```bash
  npm install -g expo-cli
