<?php
    $conn = mysqli_connect("localhost","bigbiggym","");
	mysqli_select_db($conn,"my_bigbiggym"); 
        if (mysqli_connect_errno()){ //verify connection
             echo "Error to connecto to DBMS: ".mysqli_connect_error(); // notify error
               exit();
        }
?>