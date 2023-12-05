
# Setup

`docker-compose build`

# Start Application
`docker-compose up`

# Initialize database
* Create Database
* Run Migrations
* Seed Database

`cd backend`

`docker-compose exec backend bin/startup.sh`

# Responding to changes

Stop all servers:

`ctrl-c`

Rebuild full applications

`docker-compose build`

`docker-compose up`

# Interact with Rails Server

`cd backend`

`docker-compose exec backend bash`

You may run rails commands here

# Development (Rails)

`cd backend`

You may install gems here, but you will need to re-build the application

# Clean up the application and remove all data
* Delete database 
* Delete gems
* Delete Node modules

`docker-compose down -v`

`docker-compose build`

`docker-compose up`
