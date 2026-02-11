# Tank Operations Analytics Dashboard

Live Demo: https://tank-dashboard-six.vercel.app/

## Overview

This project is a **frontend analytics dashboard** built as part of a frontend coding exercise.  
The goal was to visualize and explore operational data from an industrial factory that runs multiple tanks. Each data entry represents one operation cycle of a tank and includes timing, water usage, energy usage, and estimated savings.

The dashboard helps answer questions like:

- How much water and energy are being used overall?
- How does water usage change over time?
- Which tanks use the most water?
- How much water is saved compared to usage?
- How long do tank cycles typically last?

---

## Problem Statement

Given a JSON dataset containing tank operation cycles, the task was to:

- Derive meaningful KPIs from raw data
- Visualize insights using charts
- Allow users to filter and explore the data
- Present everything in a clean, easy-to-understand UI

---

## Solution Summary

I built a **React + TypeScript** dashboard that:

- Loads the dataset asynchronously
- Computes KPIs like total water usage, energy usage, average cycle duration, and water saved
- Visualizes insights using multiple chart types
- Allows filtering by:
  - Tank (multi-select)
  - Date range (last X days)
  - Most recent N cycles
- Uses a simple, consistent visual design with limited colors

The project is intentionally kept simple and readable so that someone new to React or data visualization can understand the flow.

---

## Features

### KPIs

- Total Water Used
- Total Energy Used
- Average Cycle Duration
- Total Water Saved

### Charts

- **Water Usage Over Time** (Line chart)
- **Water Usage by Tank** (Horizontal bar chart)
- **Water Used vs Water Saved** (Diverging bar chart)
- **Cycle Duration Distribution** (Histogram)
- **Savings vs Water Usage** (Scatter plot)

### Filters

- Select one or more tanks
- Filter by recent days
- Limit to last N cycles
- Reset all filters

---

## Tech Stack

- **React** – UI and component structure
- **TypeScript** – Type safety and clarity
- **Recharts** – Data visualization
- **Tailwind CSS** – Layout and spacing
- **Vite** – Development and build tooling

---

## Architectural & Technical Choices

### React + TypeScript

- Makes data flow explicit and easier to reason about
- Prevents many runtime errors when dealing with numeric data

### Recharts

- Simple API for common charts
- Declarative and readable
- Easy to customize without heavy configuration

### Client-side data processing

- Dataset is small enough to process in memory
- Keeps the solution simple and avoids unnecessary backend complexity

### Component separation

- Each chart is its own component
- Easier to explain, test, and modify independently
- Improves readability for reviewers

---

## Design & UX Decisions

- Limited color palette (brand + accent colors only)
- Clear labels and tooltips for all charts
- Charts sized consistently to avoid visual clutter
- Full-width layout used only where comparison benefits from more space

---

## Trade-offs & Limitations

### Trade-offs Made

- No backend or persistent storage
- No authentication or user accounts
- No server-side aggregation

### Omissions (Intentional)

- Advanced chart interactions (zoom, brush, drill-down)
- Export/download features
- Real-time updates

### What I Would Do With More Time

- Add unit tests for data transformations
- Improve accessibility (ARIA labels, keyboard navigation)
- Add chart legends and toggles
- Support CSV upload instead of fixed JSON
- Add performance optimizations for large datasets

---

## AI Tool Usage Disclosure

AI tools (ChatGPT) were used **as a development assistant**, specifically for:

- Clarifying React + TypeScript patterns
- Improving code readability and simplification
- Discussing chart selection and data transformation approaches

All code was **written, reviewed, and understood by me**.  
I did **not** copy-paste complete solutions blindly; any AI-assisted suggestions were adapted and simplified to match my understanding and design goals.

---

## Setup & Running the Project

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

## Installation & Running Locally

1. Clone the repository

   ```bash
   git clone <repo-url>
   cd tank-dashboard

   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Run Locally

   ```bash
   npm run dev
   ```
