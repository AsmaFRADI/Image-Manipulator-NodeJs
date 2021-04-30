# Incedo's "Imaginary" Service

Hi! Welcome to Incedo!

Extensive market research has shown that our users are tired of sending gigantic
full-size images to their customers. They are clamoring for a service that can
manipulate remote images on demand.

We'd like you to develop such a service.

Our main programming language is JavaScript, and we've provided a skeleton
project we'd like you to develop within. These are hard requirements:

* The server environment is NodeJS
* Requests need to be served by an [express](https://expressjs.com/) webserver
  * A skeleton of routes already exists at [lib/routes.js](lib/routes.js).
* Needs to use the [sharp](http://sharp.pixelplumbing.com/en/stable/) image
  library
  * This is already installed in the project

You are free to install any other packages you need to accomplish your goals.

## Project Scope: A Small Prototype

Of course, our users want the sun, the moon, and the stars. Among the long list
of features they've asked for are:

* Resizing image*
* Converting images between formats*
* Cropping images*
* Resampling images to different quality levels
* Rotations*
* Filters like grayscale, posterization, etc*
* AI for facial detection

Our users host their own images, and need a service that will process and
deliver their remote image on-demand (no pre-processing), for example from an
&lt;img&gt; tag on a webpage.

Obviously it's not possible to implement all of those features within a short
interview.  Therefore, please **provide a minimum viable product following the mandatory functionalities having the (\*) sign.** 


Finally: We're all programmers. We all use StackOverflow and Google, and
we all forget the argument order of `Array#reduce`. Please develop like you
normally would and use Google, MDN, whatever you need.

##Hint
```
-> A hosted image

https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189_960_720.jpg

-> Processed by our application would give 

http://localhost:8080/magic-image?url=https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189_960_720.jpg&w=300&h=200
```

## Developing

### Prerequisites

#### NodeJS...

If you have Node 8 (or later) installed, you should be able to just run:

```sh
$ npm install
$ npm run develop
```

To bring up the development server.

#### ...or Docker

If you have a relatively modern version of Node on Linux/macOS, you can use
this repository as-is. Otherwise, you can use `docker` and `docker-compose` to
quickly bring up a development environment.

* Docker -- https://docs.docker.com
  * Mac: https://docs.docker.com/docker-for-mac/install/
  * Windows: https://docs.docker.com/docker-for-windows/install/
  * Linux:
    * Ubuntu: https://docs.docker.com/install/linux/docker-ce/ubuntu/
    * Fedora: https://docs.docker.com/install/linux/docker-ce/fedora/
    * CentOS: https://docs.docker.com/install/linux/docker-ce/centos/
    * Debian: https://docs.docker.com/install/linux/docker-ce/debian/
* docker-compose -- https://docs.docker.com/compose/
  * Mac: Already installed with Docker for Mac
  * Windows: Already installed with Docker for Windows
  * Linux:
    ```sh
    sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    ```

And then you can run:

```sh
$ docker-compose up
```

To bring up the development server.

### Up-and-running

Your application should be running at
[http://localhost:8080](http://localhost:8080). Give it a try:

```
$ curl http://localhost:8080/hello?name=bob
```

(Or click here: [http://localhost:8080/hello?name=bob](http://localhost:8080/hello?name=bob))

Auto-reloading is enabled, so as you modify your Javascript files,
the server will autoreload.

#### Debugging

If you'd like to debug your server code and have Chrome, go ahead and visit:

[about://inspect](about://inspect)

### Project Structure

This project is build around a basic `express` (https://expressjs.com/)
server. There's not too many pieces. The directory layout looks like:

```
/                -- repo root
|
|- lib/          -- major source code
|  |- logger.js  -- creates a logger object
|  |- server.js  -- creates an express server, attaches logging and adds routes
|  \- routes.js  -- route handlers, good place to start working
|
|- scripts/      -- helper script directory
|  \- npm        -- runs npm inside of docker
|
\- index.js      -- entrypoint that starts the server
```

## License

Copyright (C) 2019 Incedo Services GmbH. Please do not redistribute, we use
this project for interviews / hiring. Thanks.
