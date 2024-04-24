<h1>Simple MERN Calculator with React Native</h1>
<img alt="Screen Shot of the App's UI" src="./utils/images/Pasted image.png">
<p>This MERN app allows users to perform simple calculations, featuring functionalities for adding,subtracting or multiplying, and also perform divisions with decimals saving every single calculation in MongoDB. It uses MongoDB as the database to store calculation data, Express.js for handling server-side logic, React.js[React Native] for building the user interface, and Node.js for server-side runtime environment. The app provides a seamless experience for users to perform calculations and save them.</p>
<h3>Running the Project Locally</h3>
  <p>To run this project on your local machine, follow these steps:

1. <b>Clone the Repository</b>: Clone this repository to your local machine:

   git clone <repository_url>

2. <b>Navigate to Project Directory</b>: Move into the project directory:

   cd <project_directory>

3. <b>Install Dependencies</b>: Install the necessary dependencies using npm or yarn:

   npm install

   or

   yarn

4. <b>Setup Environment Variables</b>: Create a `.env` file in the root of your project directory and add the following variables:

   MONGODB_URI=your_mongodb_uri
   PORT=5000
   CLIENT_PORT=3000

   Replace `your_mongodb_uri` with your MongoDB connection URI. Customize the `PORT` and `CLIENT_PORT` variables if needed.

5. <b>Start the Development Server</b>: Run the following command to start the development server:

   npm start

6. <b>Access the App</b>: Open your web browser and navigate to `http://localhost:3000` to access the app. You can now use the app locally on your machine, connected to your MongoDB database using the URI specified in the `.env` file.

7. <b>Note</b>: The project may not work if you do not install dependencies in both front end and backend. So you would have to apply step 2 and 3 twice, once in frontend and once in backend.
</p>
