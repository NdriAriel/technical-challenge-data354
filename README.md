# AQ54 Data Visualization App with Angular and Docker-Compose and Nodejs

## Overview

This repository contains the source code and configurations for AQ54 data visualization app built with Angular, Docker-Compose,
 Node.js, and the AirQuino API. The app is designed to fetch and display air quality data in a visually appealing manner.

## Prerequisites

Before running the application, make sure you have the following software installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/)(version 16 or latest)
- [Angular](https://github.com/angular/angular-cli) (version 12.2.18)
- Code editor of your choice (e.g., Visual Studio Code)  

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/NdriAriel/technical-challenge-data354.git
   cd technical-challenge-data354
   ```

2. Start the Docker containers:

   ```bash
   sudo docker-compose build 

   sudo docker-compose up 
   ```

## output of docker-compose up

![Alt text](image.png)
3. Open your web browser and navigate to [http://localhost:8000](http://localhost:8000) to access the Data Visualization App.
4. Open your brower and navigate to ['http://localhost:8001](http://localhost:8001) to access the Data Visualisation App documentation.

## Project Structure  

![Main](./images/image.png)

![Features](./images/imagef.png)  

![Shared](./images/image-1.png)

![Routes](./images/imager.png)

## AQ54 Data visualisation app user interface

![realTime](./images/image-realtime.png)

![ deferredTime](./images/imagedf.png)  

## Docker-Compose Configuration

The `docker-compose.yml` file defines the services, networks, and volumes needed for the application. It includes the following services:

- **aq54prod**: AQ54 app served by a nodejs server.
- **nginx**: Nginx web server for serving the Angular app.
- **api**: Placeholder for any backend API service.
- **database**: Placeholder for any backend database service.

## Development Workflow

1. Make changes to the Angular app source code in the `src/` directory.

2. Rebuild the Angular app:

   ```bash
   ng build
   ```

3. Restart the Docker containers:

   ```bash
   docker-compose restart web-app
   ```

4. Access the updated app at [http://localhost:8080](http://localhost:8080).

## Maintenance and Support

For additional information or support, please contact the maintainers of this repository:

- David Kouamé N'DRI <kouame.ndri1998@gmail.com>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
