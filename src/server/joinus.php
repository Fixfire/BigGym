<?php
    include 'db_connector.php';
    
    //Rtrieving POST data
    $appellative=$_POST["appellative"];
    $surname=$_POST["surname"];
    $name=$_POST["name"];
    $birthdate=$_POST["birthdate"];
    $address=$_POST["address"];
    $city=$_POST["city"];
    $zip=$_POST["zip"];
    $country=$_POST["country"];
    $state=$_POST["state"];
    $phone=$_POST["phone"];
    $email=$_POST["email"];
    $weight=$_POST["weight"];
    $height=$_POST["height"];
    $paymentType=$_POST["paymentType"];
    $acceptance=$_POST["acceptance"];
    //Setting other attributes
    $isStudent=0;
    $medicalOk=0;
    $hasPaid=0;

    if($paymentType!=NULL && $acceptance==true){
        $hasPaid=1;
    }

    # prepare the statement with parameters binding to avoid SQL injection
    $stmt = $mysqli->prepare("INSERT INTO client ('Appellative','Name','Surname','BirthDate','Address','City','ZIP-CODE','Country','State','PhoneNumber','Email','IsStudent','MedicalOk','HasPaid','Weight','Height') VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param("ssssssssssssssss",$appellative,$surname,$name,$birthdate,$address,$city,$zip,$country,$state,$phone,$email,$isStudent,$medicalOk,$hasPaid,$weight,$eight);
    //prepared statement execution
    $stmt->execute();

    echo ("%d Row inserted.\n", $stmt->affected_rows);

    /* close statement and connection */
    $stmt->close();
?>