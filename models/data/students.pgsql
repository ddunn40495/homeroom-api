



-- SELECT 
--    table_name, 
--    column_name, 
--    data_type 
-- FROM 
--    information_schema.columns
-- WHERE 
--    table_name = 'students';

INSERT INTO students(
	student_first_name, student_last_name, student_user_name, student_password, student_email, student_grade_level)
	VALUES ('test', 'guy', 'testguy', 'password', 'test@nomail.com', 'freshman');

	SELECT * FROM students;