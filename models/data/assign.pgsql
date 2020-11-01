SELECT * FROM students JOIN student_courses ON student_courses.student_id = students.student_id JOIN course_instance ON course_instance.course_instance_id = student_courses.course_instance_id JOIN course ON course.course_id = course_instance.course_instance_id JOIN teachers ON teachers.teacher_id = course_instance.teacher_id WHERE students.student_id = 9 AND student_courses.student_id = 9;


INSERT INTO assignments(
	 assignment_name, course_instance_id, assignment_type)
	VALUES ('test homework', '13', 'homework');

	SELECT * FROM assignments;