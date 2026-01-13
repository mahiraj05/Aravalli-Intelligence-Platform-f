# Aravalli Intelligence Platform (AIP) - Backend

This is the backend service for the Aravalli Intelligence Platform, an environmental intelligence system designed to detect deforestation and illegal mining in the Aravalli-Jaipur region.

## MVP Overview

The current MVP implementation simulates the analysis pipeline:
1.  **Trigger Analysis**: Simulates satellite data processing (using mock GeoJSON).
2.  **Storage**: Uploads generated polygons to Firebase Storage.
3.  **Database**: Stores analysis metadata and results in Firestore.
4.  **API**: Serves results to a frontend dashboard.

**Future State**: The "mock" logic in `analysis.service.js` will be replaced by Google Earth Engine API calls to compute real-time NDVI changes.

## Architecture

The project follows a clean layered architecture:

-   **`src/config`**: Configuration (Firebase, Environment variables).
-   **`src/controllers`**: Handles HTTP requests and responses.
-   **`src/services`**: Business logic (Analysis, Firestore, Storage).
-   **`src/routes`**: API route definitions.
-   **`src/utils`**: Helper utilities (Logger, etc.).
-   **`src/data`**: Mock data for MVP.

## Prerequisites

-   Node.js (v18+)
-   Firebase Project with Firestore and Storage enabled.
-   Service Account JSON file for Firebase Admin.

## Setup & Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    # Base64 encoded service account or path/details
    # For this MVP, we rely on standard ADC or specific env vars below:
    FIREBASE_PROJECT_ID=your-project-id
    FIREBASE_CLIENT_EMAIL=your-email
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
    FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Run Production Server**
    ```bash
    npm start
    ```

## API Endpoints

### 1. Trigger Analysis
*   **POST** `/api/analyze`
*   **Body**: `{ "type": "deforestation", "region": "jaipur-aravalli" }`
*   **Response**: Returns the analysis ID and summary.

### 2. Get Analysis Results
*   **GET** `/api/areas`
*   **Query Params**: `type` (optional), `region` (optional)
*   **Response**: List of analysis records suitable for map visualization.
