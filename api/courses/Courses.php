<?php

    include_once '../config/Database.php';
    init();


    function init()
    {
		$database = new Database();
		$db = $database->connect();
		CreateHeaders();
		verifyRequestMethod($db);
    }

    function CreateHeaders()
    {

		header("Access-Control-Allow-Origin: *");
		header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
		header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
			
    }
    
	function verifyRequestMethod($db)
    {
		$request_method = $_SERVER["REQUEST_METHOD"];
        switch($request_method)
		{
			case 'GET':
				//$userID = ($_GET["userid"]);
				getRecords($db);
				break;
			case 'POST':
				setRecords($db);
				break;
			case 'PUT':
				deleteRecordFromUser($db);
				break;
			case 'DELETE':

				deleteCourse($db, $_GET['id']);
				break;
			default:
				getRecords($db);
				// Invalid Request Method
				//header("HTTP/1.0 405 Method Not Allowed");
				break;
		}
    }
	
    function getRecords($db)
    {
		 $query = 'SELECT * FROM courses';
							
		 $stmt = $db->prepare($query);
		 $stmt->execute();
		
		$records_row = $stmt->fetchAll(PDO::FETCH_ASSOC);
		unset($value);
		echo json_encode($records_row);
    }

    function setRecords($db)
    {
			$data = json_decode(file_get_contents('php://input'));	
			if(isset($data->courseName)) $courseName = $data->courseName; else  $courseName = null;
			if(isset($data->courseWeeklyHours)) $courseWeeklyHours = $data->courseWeeklyHours; else  $courseWeeklyHours = null;
			if(isset($data->courseType)) $courseType = $data->courseType; else  $courseType = null;
			if(isset($data->coursePassGrade)) $coursePassGrade = $data->coursePassGrade; else  $coursePassGrade = null;
		
		 $query = "INSERT INTO courses
					(coursename, coursetype, courseweeklyhours, coursepassgrade) 
					 VALUES (?,?,?,?)";

					 
		 $stmt = $db->prepare($query);
		 $stmt->bindParam(1, $courseName);
		 $stmt->bindParam(2, $courseType);
		 $stmt->bindParam(3, $courseWeeklyHours);
		 $stmt->bindParam(4, $coursePassGrade);
	
		 $stmt->execute();
		 
		 getRecords($db);
    }

		function deleteCourse($db, $id){
			$query = 'DELETE FROM courses WHERE id = ?';
							
			$stmt = $db->prepare($query);
			$stmt->bindParam(1, $id);
			$stmt->execute();
	
			getRecords($db);
		}



?>