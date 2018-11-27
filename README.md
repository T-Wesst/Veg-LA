# Veg-LA

## Description

A crowd sourced web app that publishes reviews for local vegan businesses in the Los Angeles area.

## Live Demo

To see the app [click here](https://veg-la.herokuapp.com/)

## Features

- `Authentication:`

  - Users can login with username and password.

  - Admin sign-up with admin code.

- `Authorization:`

  - A user cannot manage posts or view user profile without being authenticated.

  - A user cannot edit or delete posts and comments created by other users.

  - Admin can manage all posts and comments.

- `Manage posts with basic functionalities:`

  - Create, edit and delete posts and comments.

  - Upload photos.

  - Search existing posts.

- `Manage user account with basic functionalities:`

  - Profile page setup with sign-up

- `Flash messages responding to users' interaction with the app`

- `Responsive web design`

## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

### Clone Repo

```sh
git clone https://github.com/T-Wesst/Veg-LA.git
```

### Install Dependencies

```sh
npm install
```

### Comments in code

Comments in the source code are notes and may not seem necessary from a developer's point of view.

### Front-end

- [ejs](http://ejs.co/)
- [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

- [express](https://expressjs.com/)
- [express-session](https://github.com/expressjs/session#express-session)
- [mongoDB](https://www.mongodb.com/)
- [mongoose](http://mongoosejs.com/)
- [passport](http://www.passportjs.org/)
- [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
- [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose-email)
- [method-override](https://github.com/expressjs/method-override#method-override)
- [moment](https://momentjs.com/)
- [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

- [Heroku](https://www.heroku.com/)
- [Cloud9](https://aws.amazon.com/cloud9/?origin=c9io)

## License

#### [MIT](./LICENSE)
