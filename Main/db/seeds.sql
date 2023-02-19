INSERT INTO department (department_name)
VALUES ("Finance"),
       ("Operations"),
       ("Customer"),
       ("Technology"),
       ("Engineering");

SELECT * FROM department;

INSERT INTO role (title,salary,department_id)
VALUES ("Finance Manager", 120000,1),
       ("Engineering Manager", 150000,5),
       ("Head of Technology", 210000,4),
       ("Customer Service Officer", 70000,3),
       ("Electrical Engineer", 130000,5),
       ("Financial Accountant", 95000,1),
       ("Software Developer", 115000,4),
       ("Civil Engineer", 100000,5);

SELECT * FROM role;

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Ben","Smith",1,NULL),
        ("Adam", "Davies",2,NULL),
        ("Laura", "Jarvis",3,NULL),
        ("Michael", "Low",4,NULL),
        ("Luke", "Adams",5,4),
        ("Stacey", "Leah",6,1),
        ("Andrew", "James",7,3),
        ("Belinda", "Williams",8,2);

SELECT * FROM employee;
       
