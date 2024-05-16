# Frontend
- Install packages
`cd frontend`
`yarn `
- Start frontend
`yarn start`


# Backend
`cd backend`
- Seed data base initial data 
`python manage.py seed --mode=refresh`
- make migration
`python manage.py makemigrations`
- Migrate
`python manage.py migrate`
- start server
`python manage.py runserver`