## Todo App
Todo (Task) management application. 
* Should allow to create a task
* Should allow adding multiple subtasks to a parent task
* Should allow marking both task and subtask as done or undone
* Tasks and its subtasks should be displayed as accordion

## Installation

```bash
> cd todo-backend
	> npm install
	> npm start
    > npm run test

> cd todo-frontend
	> npm install
	> npm start
    > npm run test
```

## Technologies Used
* Frontend: React.js, mui
* Backend: Node.js with Express.js
* Database: Postgres​

## Notes

```python
Backend base URL: localhost:8080/tasks
## Todo Tasks API's

# Create tasks
curl --location --request POST 'localhost:8080/tasks' \
--header 'Content-Type: application/json' \
--data-raw '{

    "title":"Prep for presentation"
}'

# Retrive tasks
curl --location --request GET 'localhost:8080/tasks'

# Update task status
curl --location --request PUT 'localhost:8080/tasks/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "status":"pending"
}'

## Sub tasks API's

# Create Subtasks
curl --location --request POST 'localhost:8080/subtasks' \
--header 'Content-Type: application/json' \
--data-raw '{

    "title":"add to my day",
    "taskId":1
}'

# Retrive subtasks
curl --location --request GET 'localhost:8080/subtasks/1'

# Update Subtasks
curl --location --request PUT 'localhost:8080/subtasks/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "status":"pending"
}'

```

## Refer screenshot attached in the folder.
	