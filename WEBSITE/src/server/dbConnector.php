<?php
   
    //connection to db
    $mysqli = new mysqli("localhost", "bigbiggym", "", "my_bigbiggym");

    if (mysqli_connect_errno()) { //verify connection
        echo "Error to connect to DBMS: ".mysqli_connect_error(); //notify error
        exit(); //do nothing else 
    }

?>
