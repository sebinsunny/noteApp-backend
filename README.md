# noteApp-backend

Used nodejs as the backend for the application, I have successfully implemented all the backend api, Postgresql is the backend db to store the user information, user location, user's note
* `/signup` REST API for sign up new account, sending username and password as post request, state values are handled using react component and post request send using `axios`,
  validate if username existing or not
  ![Imgur](https://imgur.com/A2bQ7ns.png)
  
* `/signin` API for sign in, sending username and password as post request and validate the inputs with the database

* `/notes/new` API for adding new notes on the map, parameters are current position (fetch from ui latitude and longitude ), current user id and the text notes 
* `notes/byText/:text` API for searching notes by text

     ![Imgur](https://imgur.com/5WYyOZC.png)

* `/notes/all` API for retrieving all the users note 
    ![Imgur](https://imgur.com/JHtp0m6.png)
    
* `/notes/byId/:id` API for searching notes by user id
    ![Imgur](https://imgur.com/vqy8eEM.png)
# noteApp -frontend
* `sebin.ai/login` starting page, this page handles the user account creation and authentication and route to map page 
  
    ![Imgur](https://imgur.com/oLWwq53.png)

* retrieving all notes when user successfully logged in
    ![Imgur](https://imgur.com/VE4GQBF.png)
    
* adding notes on the map 
    ![Imgur](https://imgur.com/7ZnbBob.png)


