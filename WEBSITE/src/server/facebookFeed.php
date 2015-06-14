<?php
    function fetchUrl($url){

     $ch = curl_init();
     curl_setopt($ch, CURLOPT_URL, $url);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
     curl_setopt($ch, CURLOPT_TIMEOUT, 20);

     $feedData = curl_exec($ch);
     curl_close($ch); 

     return $feedData;

    }

    $profile_id = "bigbiggym";

    //App Info, needed for Auth
    $app_id = "1677221109163837";
    $app_secret = "497882b4b81051047c395fa2d6c7d508";

    //Retrieve auth token
    $authToken = fetchUrl("https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id={$app_id}&client_secret={$app_secret}");

    $json_object = fetchUrl("https://graph.facebook.com/{$profile_id}/feed?{$authToken}");
    $response=json_decode($json_object);

    echo json_encode($response);
?>
