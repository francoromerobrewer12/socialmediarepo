WELCOME TO SOCIAL MEDIA MERN APP!

This project was built to learn about MERN applications and to include a MongoDB Database for the first time in one of my projects. It is a social media app, 
pretty similar to facebook, in which you can create a user, login, have a personal page with a cover picture, profile picture, your description and posts. You 
can also follow friends, watch their profiles and even give a like to their posts. All this information is stored in MongoDB (users and posts info).

Lets get started!

-------------------------

SETUP THE PROYECT!

Okay once you clone this repository to your computer and install all the dependeces you should open a terminal in the api folder and run npm start to connect to
the database. You will see a message saying: "Backend server is running! Connected to Social Media database!" . Then open another terminal but this time in the 
client folder and also run npm start. You should be able to see the first page of the app. 

-------------------------

LOGIN | REGISTRATION PAGE

New User Experience:
First of all you can create a user by completing the inputs and clicking the Sign Up button. If there was no problem with the passwords or lengths of the inputs
you will be redirected to the Login Page in which you will have to add your just created email and password. Once inside your account, you will see a navbar which
only the Logout button and the profile picture at the right is working, the rest is just part of the design and has no other functionality. By clciking the image 
you would go to your profile.

On the left side of the screen there is a fixed menu, and on the right there are a couple ads and notifications. Both sectionshave no functionality.
On the middle section you will be able to create and see your posts by writing and choosing a picture (both optional). You will be able to see the post once you 
click the share button. All the other buttons have no functionality.

If you click your profile picture you will go to your profile page. As you do not have a cover or profile picture, the app assigned default images. On this page 
you can only see your posts.

Existing User Experience:
I personally prefer you to try this mode because there is an already created friends list with posts and followings. To enter to my account just go the Log In page
and enter this data:
- Email: francoromerobrewer@gmail.com 
- Password: 12345
You will see many other posts from other users that I follow. You can see their profile pictures and posts, give them like, follow and unfollow the users.

-------------------------

TECHNOLOGIES USED IN THIS PROJECT

- This is a MERN App so basically the main technologies involved were MongoDB, Express, React and Node.js
- As I mentioned before, all the information related to the users and the posts is stored in MongoDB and with the help of Express, Mongoose and Axios I
established the connection between the database and the frontend. 
- Inside api folder you can see the Post and User models, as well as all the routes and http request that you can do to both users and posts
(create, update,delete,follow,unfollow,etc).
- Another library used in the server section was bcrypt, used to hash passwords and save them in a more protected and secure way.
- Inside the client folder there are many things that should be clear. First is that the user logged in is store in our state by using Context API. The reducer,
actions the actual context is inside of the context directory. 
- To move from one page to the other I decided to use React Router.
- You can not like your personal posts or follow yourself as a user.
- You could do updates in the users information by using Postman but in the page the updating options were not built so definetely I would encourage you to do it.
- All the images used were optimized to the reduce their weight and make the app faster to load.
- For styling I am using scss, so thats why im using node-sass to transpile scss to normal css.



















