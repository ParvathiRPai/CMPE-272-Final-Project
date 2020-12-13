FROM openjdk:15-jdk
WORKDIR /app
COPY . ./
# RUN ./gradlew build --debug
RUN ./gradlew build
# ARG JAR_FILE=./build/libs/relieffund-0.0.1-SNAPSHOT.jar
ARG EX_PORT=8080
EXPOSE ${EX_PORT}
# COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","./build/libs/relieffund-0.0.1-SNAPSHOT.jar"]