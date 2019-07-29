# nodejs-project
This project contains 2 parts:
1) angular - front end UI
2) nodejs - backend hosting APIs

## Backend Nodejs
To start the backend system, navigate to the nodejs folder in command prompt, and run <b>node server.js</b>.
The backend system should be up and running on <i>http://localhost:3000</i>

## Frontend Angular
To start the frontend system, navigate to the angular folder in command prompt, and run <b>npm install</b> to install all the dependencies.
Next, run <b>ng serve</b> to start the system. 
The front end system should be up and running on <i>http://localhost:4200</i>

## Database
The database used is MySQL. The credentials and details of the database can be found on nodejs/db.js
It contains of 3 tables.
1) Orders<br>
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

2) Payment<br>
CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  `order_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `declined_reason` varchar(500) DEFAULT NULL,
  `last_updated_date` datetime NOT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `payment_id_UNIQUE` (`payment_id`),
  KEY `order_id_idx` (`order_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

3) Users<br>
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `pin` varchar(45) NOT NULL,
  `balance` varchar(45) NOT NULL,
  `update_frequency` int(11) NOT NULL DEFAULT '5',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
