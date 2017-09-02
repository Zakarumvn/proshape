package com.proshape;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.proshape")
public class ProshapeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProshapeApplication.class, args);
	}
}
