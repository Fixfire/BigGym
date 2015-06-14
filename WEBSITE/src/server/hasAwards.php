<?php
    include 'dbConnector.php';

    $id=$_POST["id"];
    # extract results mysqli_result::fetch_array
    $query = "SELECT * FROM awards WHERE Id_Instructor=".$id;
    //query execution
    $result = $mysqli->query($query);
    //if there are data available
    if($result->num_rows >0)
    {
        $response = array('boolean' => true);
    }else{
        $response = array('boolean' => false);
    }
    
    echo json_encode($response);

    //free result
    $result->close();

    //close connection
    $mysqli->close();
?>
