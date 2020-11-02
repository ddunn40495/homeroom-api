-- getting all cousres for a department 

-- need to add where clasue using params

SELECT * FROM department JOIN course ON course.department_id = department.department_id;

-- getting all courses and course instances from a department 

--need to add where clause using params
SELECT * FROM department JOIN course ON course.department_id = department.department_id
JOIN course_instance ON course_instance.course_instance_id = course.course_id;

-- get all student courses 

-- need to add where clause using params



SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id
JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id
JOIN course ON course.course_id = course_instance.course_instance_id
JOIN teachers ON teachers.teacher_id = course_instance.teacher_id WHERE students.student_id = 1 AND student_courses.student_id = 1;

-- get every student in a class

-- need to add where clasue to take in param for what class

   SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN course ON course.course_id = course_instance.course_id JOIN department ON department.department_id = course.department_id
   WHERE course_instance.course_instance_id = 1;














-- get all assignments from a student


   SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id 
   JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN course ON course.course_id = course_instance.course_id 
   JOIN assignment ON assignment.course_instance_id = course_instance.course_instance_id
   JOIN assignment__instance ON assignment__instance.assignment_id = assignment.assignment_id
   WHERE students.student_id = 4
   AND assignment__instance.student_id = 4;


-- get all assignments from a student for a specific class
 SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN course ON course.course_id = course_instance.course_id JOIN department ON department.department_id = course.department_id
   WHERE course_instance.course_instance_id = 1;


   SELECT * FROM assignments;

INSERT INTO student_courses(
	 student_id, course_instance_id)
	VALUES ( 1, 12),
	( 2, 12),
	( 3, 12);

SELECT * FROM students;

SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN courses ON courses.course_id = course_instance.course_id JOIN assignments ON assignments.course_instance_id = course_instance.course_instance_id JOIN assignment_instance ON assignment_instance.assignment_id = assignments.assignment_id;

     SELECT * FROM departments JOIN courses ON courses.department_id = departments.department_id;


SELECT course_name FROM courses WHERE courses.course_id = 2;


SELECT * FROM teachers;

INSERT INTO course_instance(
	 course_id, course_instance_period, teacher_id, course_instance_name)
	VALUES ( '3', '1', '14', 'test-1-1');



   SELECT * FROM departments JOIN courses ON courses.department_id = departments.department_id JOIN course_instance ON course_instance.course_id = courses.course_id;

/* Route For Assignment Instance */
   SELECT assignments.assignment_id, students.student_id FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN courses ON courses.course_id = course_instance.course_id JOIN assignments ON assignments.course_instance_id = course_instance.course_instance_id WHERE assignments.assignment_id = 4 AND course_instance.course_instance_id = 12;

/* Oooooooooh yessssssssss */
   INSERT INTO assignment_instance (assignment_id, student_id)  SELECT assignments.assignment_id, students.student_id FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN courses ON courses.course_id = course_instance.course_id JOIN assignments ON assignments.course_instance_id = course_instance.course_instance_id WHERE assignments.assignment_id = 4 AND course_instance.course_instance_id = 12;


   SELECT * FROM assignment_instance JOIN assignments ON assignments.assignment_id = assignment_instance.assignment_id JOIN course_instance ON course_instance.course_instance_id = assignments.course_instance_id JOIN student_courses ON student_courses.course_instance_id = course_instance.course_instance_id JOIN students ON students.student_id = student_courses.student_id WHERE course_instance.course_instance_id = 12;


   INSERT INTO students(
	student_first_name, student_last_name, student_user_name, student_password, student_email, student_grade_level)
	VALUES ('Bob', 'Sanders', 'bsand', 'password', 'bsand@nomail.com', 'freshman'),
   ('Bob', 'Willaims', 'bwill', 'password', 'bwill@nomail.com', 'freshman'),
   ('Bob', 'Pope', 'bpope', 'password', 'bpope@nomail.com', 'freshman'),
   ('Bob', 'Ocho', 'bocho', 'password', 'bocho@nomail.com', 'freshman'),
   ('Bob', 'Loops', 'Loops', 'password', 'Loops@nomail.com', 'freshman'),
   ('Bob', 'Miller', 'bmill', 'password', 'bmill@nomail.com', 'freshman'),
   ('Bob', 'thomas', 'bthomas', 'password', 'bthomas@nomail.com', 'freshman'),
   ('Bob', 'Stars', 'bstars', 'password', 'bstars@nomail.com', 'freshman');

   SELECT * FROM courses JOIN course_instance ON course_instance.course_id = courses.course_id;

   SELECT students.student_id FROM students 



   SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN courses ON courses.course_id = course_instance.course_id;



SELECT * FROM departments JOIN courses ON courses.department_id = departments.department_id JOIN course_instance ON course_instance.course_id = courses.course_id JOIN teachers ON teachers.teacher_id = course_instance.teacher_id;