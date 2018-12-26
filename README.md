# QuestionNAnswers

## UI Development server

Run the below command in the root directory of the project (Where the package.json resides).


1. Change the working directory to the Server folder.
    cd Server
2. Run the below maven command to build the boot project.
    mvn clean install -Dmaven.test.skip=true
3. Run the below command to build a docker image for running the boot application. 
    docker build -t spring/server .
4. Below command deletes if already existing docker bridge network.
    docker network rm qna_net
5. Below command creates a new docker bridge network.
    docker network create --subnet 172.25.0.0/16 qna_net
6. Stop the mysql instance if already running.
    docker stop qna_mysql
7. Remove the mysql container if already exist.
    docker rm qna_mysql
8. Start the mysql instance. This will be hosting the application data store.
    docker run --name qna_mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=qnaapp --network=qna_net --ip=172.25.1.1 -d mysql:5.7.24
9. Stop the boot container if already running.
    docker stop qna_boot
10. Remove the boot container if already exists.
    docker rm qna_boot
11. Start the boot docker using the below command. This will expose the boot server in the port 8080.
    docker run --name qna_boot -p 8080:8080 --network=qna_net -d spring/server
12. Go one directory up.
    cd ..
13. Install node dependencies.
    npm install
14. Run production build.
    npm run build
15. Build a docker image for the react app.
    docker build -t react/qnaapp .
16. Stop the react app if already running.
    docker stop qnaapp
17. Remove the react app container if already exists.
    docker rm qnaapp
18. Finally run the react app docker. This exposes the React app in the port 80.
    docker run --name qnaapp -p 80:3000 -d react/qnaapp

## Link for the project

Open the link http://localhost:80 in the browser to view the UI.
