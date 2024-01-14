# Creating Invoice App
Task is to create a billing and invoice automation platform for SaaS customers. Users should
be able to log in using Google OAuth, view their usage details, and access billing and invoice information.
Additionally, the platform should automate billing based on usage data using zapier.com.


## Requirements:
### Backend Microservice (Node.js):
   #### Implement a Node.js backend microservice that provides the following API endpoints:
    - User authentication: Enable users to log in using Google OAuth.
    - Usage details: Allow users to view their SaaS usage details, including relevant metrics.
    - Billing information: Provide billing details based on usage, including the current billing cycle and cumulative usage.
    - Invoice generation: Implement an endpoint to generate invoices for cumulative usage.
    - Integrate with zapier.com to automate billing processes. Set up workflows to trigger billing actions based on SaaS usage metrics.
### Frontend (React):
   #### Develop a React frontend that includes the following features:
    - Google OAuth integration: Implement a user interface for users to log in using their Google accounts. 
    - Usage details: Display the SaaS usage details, including relevant metrics.
    - Billing information: Show the current billing cycle details and cumulative usage for the user.
    - Invoice generation: Provide a button or option for users to generate their invoices.

## Implemented:
### Backend (Node.js):
   #### Implement a Node.js backend microservice that provides the following API endpoints:
    - User authentication: Enable users to log in using Google OAuth.
    - Fetching usage details from database
    
### Frontend (React):
   #### Develop a React frontend that includes the following features:
    - Google OAuth integration: Implement a user interface for users to log in using their Google accounts. 
    - Displaying Saas Details
    - Able to create users invoice pdfs when clicked.
    


To run the project in your local system Follow below Instructions:

## Front End

In the invoiceapp directory, you can run:

### `npm install or npm i`
To install dependencies 

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Backend

In the invoiceapp/Backend directory, you can run:

### `npm install or npm i`
To install dependencies 

### `npm start`

Open [http://localhost:5000](http://localhost:5000) to run backend server.





