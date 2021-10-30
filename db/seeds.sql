INSERT INTO department(department_name)
VALUES("Engineering"),
 ("Sales"),
  ("Finance"),
   ("Legal"),
    ("Marketing");

INSERT INTO role(title, salary, department_id)
VALUES("Junior Engineer", 80000, 1),
 ("Senior Engineer", 135000, 1),
  ("CFO", 3500000, 3),
   ("CEO", 30000000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('James', 'Ringo', 1, 2),
 ('Jim', 'Yeagerman', 1, null),
 ('Guy', 'Hans', 1, 2),
  ('Ryan', 'Jacobs', 2, 2),
   ('Kyle', 'Swims', 4, null);

