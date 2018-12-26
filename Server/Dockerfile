FROM openjdk:8-jdk-alpine
VOLUME /var/www
ARG DEPENDENCY=target/
COPY ${DEPENDENCY}/Server/lib /qnaapp/lib
COPY ${DEPENDENCY}/Server-1.0.jar /qnaapp/lib
ENTRYPOINT ["java","-cp","qnaapp/lib/*","com.stackroute.qna.QnAApp"]