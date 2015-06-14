<?php
    header('Access-Control-Allow-Origin: *');

    include 'dbConnector.php';

    $course = $_POST["name"];
   
    # extract results mysqli_result::fetch_array
    $query = "SELECT * FROM lesson WHERE lesson.course = '".$course."'";
    //query execution
    $result = $mysqli->query($query);
    //if there are data available
    if($result->num_rows >0)
    {
        $myArray = array();//create an array
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $myArray[] = array_map('utf8_encode', $row);	
        }
        echo json_encode($myArray);
    }

    //free result
    $result->close();

    //close connection
    $mysqli->close();
?>
