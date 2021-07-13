# React & Node.js App

![front](https://i.imgur.com/BNAHcS8.png)

This is my end of degree project, a restaurant web app using MongoDB, React, SASS, Bootstrap and Node to create a full stack experience.
You can show dishes, let clients make reservations, log in, create a menu item, users, manage the reservations and manage the other users.

### Menu items front page
![menu](https://i.imgur.com/dCkOCzS.png)
### Login system
![Login](https://i.imgur.com/gnC9dtx.png)
### Table booking
![booking](https://i.imgur.com/Amm309M.png)
### Dish creation screen
![Dish](https://i.imgur.com/V7yJJ6d.png)
### Dish management 
![management](https://i.imgur.com/ubfJd0D.png)


## Instalation
- Once cloned cd into __servidor__ and run `npm install`.
- Go back and cd into __cliente__ and run again `npm install`.
- Create a mongoDB free database, get the link and replace the line in lamoderna/servidor/claves/claves.js
- Other deoendencies may need to be installed manually if encounter a warning/error during this proccess.
- Open postman and send a post to create a user
POST: http://localhost:5000/usuarios/nuevousuario
```
{
    "nombre": "YOUR USER NAME",
    "email": "YOUR EMAIL",
    "contrasenha": "A PASSWORD"
}
```

As such:
![postman](https://i.imgur.com/1N0qwAr.png)
- You will get a response: "Usuario nuevo resgistrado con exito"
- Now go back to __servidor__ and run `nodemon app`.
- Open a new tab on your terminal/console and cd into __cliente__, there run `npm start` and you should see the beautiful project on your browser.
- To log in add /admin ad the end of the url and create dishes, reservations and other users.
- If you want to test my DB and you are a recruiter, email me to get access ;) 
