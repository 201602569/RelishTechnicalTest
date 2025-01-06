# MetaPhoto Application

A web application for viewing and filtering photos with pagination.

## Run Locally

### Backend
To run the backend locally:

```bash
# Navigate to the backend folder
cd metaphoto-backend

# Install dependencies
npm install

# Start the backend server
npm start
```

Ensure the backend server is running on port 3000. The API will be accessible at http://localhost:3000.

### Frontend
To run the frontend locally:

```bash
# Navigate to the frontend folder
cd metaphoto-frontend

# Install dependencies
npm install

# Start the frontend application
npm start
```

Open the URL displayed in the console, usually something like http://localhost:3001/.

## Visit the Deployed Website
You can access the live application at:
http://metaphoto-frontend.s3-website.us-east-2.amazonaws.com/

Note: If the website does not load in your browser, try entering the URL without the http:// prefix:


metaphoto-frontend.s3-website.us-east-2.amazonaws.com/

### How to Use
The MetaPhoto application allows you to browse and filter photos with the following features:

Filters:

Filter photos by Title.
Filter photos by Album Title.
Filter photos by Email.
You can apply one filter, multiple filters, or leave all fields empty to see all photos.


Pagination:

Use the Limit field to specify how many photos to display per page.
Use the Offset field to set the starting point for fetching photos.
Navigate between pages using the Next and Previous buttons.

Once the filters and pagination settings are configured, click the Search button to fetch and display the filtered results.
