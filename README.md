# vue-django-docker

This project contains the following technology:

1. Vuex Store
2. VueJS / Vuetify
3. JEST / Vue Test Utils
4. Django REST Framework
5. Docker

## Follow these steps to make the application running:

### 1. Clone the Project

1. `https://github.com/Bomikuu/vue-django-docker.git`

### 2. Setting up the Project

Install [Docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/).

Copy the local settings template. They're all in one file, dc.dev.yml. docker-compose.override.yml is gitignored so you can store secrets there if needed.

1. On the root directory, run `cp dc.dev.yml docker-compose.override.yml`
2. For first time setup, run this command `docker-compose up --build`
3. For succeeding running of project, run this command `docker-compose up`

### 3. How to Django Migrate Via Docker Container
1. On the root directory, run this docker command `docker-compose exec backend python3 manage.py makemigrations`
2. Then `docker-compose exec backend python3 manage.py migrate`

### 4. How to Load the Initial Data / Fixtures

1. On the root directory `docker-compose exec backend python3 manage.py loaddata core/fixtures/features.json` to load the initial data

### 5. Running the Frontend/Backend via Docker

1. Go to `http://localhost/` to access the frontend
2. Go to `http://localhost/admin` to access the Django Admin


### 6. To Access the API manullay via URL, you can try this:

1. Go to `http://localhost/api/features` to see the list of features in the database


