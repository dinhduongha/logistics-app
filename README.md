# Logistics TMS: Automated Transport Management Solution

![Build Status](https://github.com/suxrobgm/logistics-app/actions/workflows/dotnet-build.yml/badge.svg)
![Tests](https://github.com/suxrobgm/logistics-app/actions/workflows/dotnet-test.yml/badge.svg)
![Deployment](https://github.com/suxrobgm/logistics-app/actions/workflows/deploy-ftp.yml/badge.svg)
![OfficeApp Build](https://github.com/suxrobgm/logistics-app/actions/workflows/officeapp-build.yml/badge.svg)
![DriverApp Build](https://github.com/suxrobgm/logistics-app/actions/workflows/driverapp-build.yml/badge.svg)

Logistics TMS is an ultimate solution for all transport management needs. With a focus on automation, this Transportation Management System (TMS) is designed to streamline logistics, offering an efficient, optimized way to manage inbound and outbound transport operations.

## Overview

Logistics TMS primarily targets logistics and trucking companies seeking to streamline their operations. It offers a comprehensive suite that encompasses an administrator web application, a management web application, and a driver mobile application. The backend is powered by a robust REST API and an Identity Server application.

Operating on a multi-tenant architecture, Logistics TMS features a primary database for storing user credentials and tenant data, including company name, subdomain name, database connection string, and billing periods. Each tenant or company has a dedicated database.

## Getting Started

Follow these steps to get the project up and running:

1. [Download](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) and install the .NET 7 SDK. 

2. Clone this repository: 
    ```
    $ git clone https://github.com/suxrobGM/logistics-app.git
    $ cd logistics-app
    ```

3. Update database connection strings: 
   Modify local or remote `MS SQL` database connection strings in the [Web API appsettings.json](./src/Api/Logistics.WebApi/appsettings.json) and the [IdentityServer appsettings.json](./src/Apps/Logistics.IdentityServer/appsettings.json) under the `ConnectionStrings:MainDatabase` section. Update tenant databases configuration in the [Web API appsettings.json](./src/Api/Logistics.WebApi/appsettings.json) under the `TenantsConfig` section.

4. Seed databases:
   To initialize and populate the databases, run the `seed-databases.bat` script provided in the repository.

5. Run applications:
   Launch all the applications in the suite using the respective `.bat` scripts in the repository.

6. Access the applications:
   Use the following local URLs to access the apps:
    - Web API: https://127.0.0.1:7000
    - Identity Server: https://127.0.0.1:7001
    - Admin app: https://127.0.0.1:7002
    - Office app: https://127.0.0.1:7003

## Architectural Overview

For a deeper understanding of the project structure, refer to the architecture diagram:
![Project architecture diagram](./docs/project_architecture.jpg?raw=true)

## Sneak Peek into the Office App

Here are some screenshots of the Office Application for a better understanding:
![Office App](./docs/office_app_1.jpg?raw=true)
![Office App](./docs/office_app_2.jpg?raw=true)
![Office App](./docs/office_app_3.jpg?raw=true)
