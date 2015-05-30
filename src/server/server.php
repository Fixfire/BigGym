<?php
    include 'db_connector.php';

    $queryResult=getDescription($_POST["pt"]);

    function getDescription($pt){
        $query="SELECT Name FROM instructor WHERE Id=1";
        $result=mysqli_query($conn,$query);
        
        if(mysqli_num_rows($result)>0){
            $myArray=array(); //create an array to store result
            $i=0;
            while($row=mysqli_fetch_array($result)){
                $myArray[i]=array_map('utf8_encode', $row);
                $i++;
            }
            
            echo json_encode($myArray); //export in json
        }
        mysqli_close($conn);
    }
?>