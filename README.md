# zombie-apocalypse v1.0

## Description

RESTful API for zombie apocalypse system running with [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Documentation

You can find all the API documentation [here](https://documenter.getpostman.com/view/8346909/2s83zcRRnM)

## Important Notes

### Steps to setup the application in local environment:
1. Install postgreSQL [here](https://www.postgresql.org/download/)
2. Install postgGIS by follow this tutorial [here](http://www.bostongis.com/PrinterFriendly.aspx?content_name=postgis_tut01)
3. Install pgAdmin4 [here](pgadmin.org/download/)
3. Open the .env file and replace DB_PASSWORD with your own postgreSQL password

### Steps to run the application:
1. npm i -g @nestjs/cli
2. npm install --force
3. npm run start

## List of Module
1. Survivor (survivor.controller.ts @ survivor.service.ts @ survivor.module.ts)
    * Register survivor`@Post('survivor/create')`
    * Get survivor `@Get('survivor')`
    * Update survivor location `@Patch('survivor/update')`
    * Generate survivor report `@Get('survivor/report')`    
2. Inventory (inventory.controller.ts @ inventory.service.ts @ inventory.module.ts)
    * get inventory `@Get('inventory')`
      
## Controllers 
- Controllers are responsible for handling incoming requests and returning responses to the client.
- For example, app.controller.ts

## Services
- The service will be responsible for data storage and retrieval, and is designed to be used by the Controller
- For example, app.service.ts

## Modules
- A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.
- For example, app.module.ts