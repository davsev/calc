<?php


    class Users{
        private $conn;
        private $table = 'users';

        public $id;
        public $fname;
        public $lname;
        
        public function __construct($db){
            $this->conn = $db;
        }


        public function get_users($username, $password)
	{
        $query = 'SELECT * FROM
        ' . $this->table . ' 
        WHERE
        username = ? AND password = ?'; 

    
    $stmt = $this->conn->prepare($query);
    
    $stmt->bindParam(1, $username);
    $stmt->bindParam(2, $password);
    
    $stmt->execute();

    return $stmt;
		header('Content-Type: application/json');
		echo json_encode($response);
	}

    


        public function login(){
            $query = 'SELECT * FROM
                ' . $this->table . ' 
                WHERE
                username = ? AND password = ?'; 

            
            $stmt = $this->conn->prepare($query);
            
            $stmt->bindParam(1, $this->username);
            $stmt->bindParam(2, $this->password);
            
            $stmt->execute();

            return $stmt;
        }

    }
