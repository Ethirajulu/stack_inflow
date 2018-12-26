package com.stackroute.qna;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = { "com.stackroute" })
@EntityScan("com.stackroute.entity")
@EnableJpaRepositories("com.stackroute.repo")
public class QnAApp {

	public static void main(String[] args) {
		SpringApplication.run(QnAApp.class, args);
	}
}
